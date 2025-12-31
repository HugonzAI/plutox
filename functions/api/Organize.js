export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.OPENAI_API_KEY) {
    return new Response("Missing OPENAI_API_KEY", { status: 500 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const text = (payload?.text || "").trim();
  if (!text) return new Response("Missing text", { status: 400 });

  const system = `
You are Plutox Organizer.
Your job: turn a messy brain-dump into a clean decision structure for a later Decision Freezer.

Return ONLY valid JSON (no markdown, no backticks), matching this schema:
{
  "decision": "string (one sentence; the decision to make)",
  "optionA": "string (best guess)",
  "optionB": "string (best guess)",
  "horizon": "string (best guess, e.g., 3 months / 6 months / 1 year)",
  "nonnegotiables": "string (bulleted text allowed, but as plain string)",
  "constraints": "string",
  "fears": "string",
  "goal": "string",
  "missing_questions": ["string (2-6 short questions to ask user)"]
}

Rules:
- If options are unclear, propose two plausible options based on the text.
- Keep everything concise and usable.
- Never ask for more than 6 questions.
`.trim();

  const user = `
Brain dump:
${text}

Task:
Extract a decision structure so the user can confirm it quickly.
`.trim();

  const resp = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      max_output_tokens: 500
    })
  });

  if (!resp.ok) {
    const errText = await resp.text();
    return new Response(`OpenAI error (${resp.status}): ${errText}`, { status: 502 });
  }

  const data = await resp.json();
  const textOut = extractTextFromResponses(data);

  let out;
  try {
    out = JSON.parse(textOut);
  } catch {
    const json = extractFirstJsonObject(textOut);
    if (!json) return new Response(`Model did not return JSON. Raw:\n${textOut}`, { status: 502 });
    try { out = JSON.parse(json); } catch { return new Response(`Failed to parse JSON. Raw:\n${textOut}`, { status: 502 }); }
  }

  if (!out || typeof out !== "object" || typeof out.decision !== "string") {
    return new Response(`Invalid output shape. Raw:\n${textOut}`, { status: 502 });
  }

  return new Response(JSON.stringify(out), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function extractTextFromResponses(data) {
  const output = Array.isArray(data?.output) ? data.output : [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const c of content) {
      if (typeof c?.text === "string") return c.text;
      if (typeof c?.content === "string") return c.content;
    }
  }
  if (typeof data?.output_text === "string") return data.output_text;
  return "";
}

function extractFirstJsonObject(s) {
  const start = s.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < s.length; i++) {
    const ch = s[i];
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    if (depth === 0) return s.slice(start, i + 1);
  }
  return null;
}