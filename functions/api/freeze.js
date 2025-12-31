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

  const {
    decision = "",
    optionA = "",
    optionB = "",
    horizon = "",
    nonnegotiables = "",
    constraints = "",
    fears = "",
    goal = ""
  } = payload;

  if (!decision || !optionA || !optionB || !horizon) {
    return new Response("Missing required fields: decision, optionA, optionB, horizon", { status: 400 });
  }

  const system = `
You are Plutox, a Decision Freezer.
Freeze a decision into a single executable commitment.
Be direct, specific, and opinionated. No vague advice.

Return ONLY valid JSON (no markdown, no backticks), matching this schema:
{
  "decision": "string",
  "summary": "string",
  "assumptions": ["string"],
  "tradeoffs": ["string"],
  "next7days": ["string"],
  "fallback": "string"
}
`.trim();

  const user = `
Decision statement: ${decision}

Option A: ${optionA}
Option B: ${optionB}

Time horizon: ${horizon}

Non-negotiables: ${nonnegotiables || "(none)"}
Constraints: ${constraints || "(none)"}
Biggest fears: ${fears || "(none)"}
Primary goal: ${goal || "(none)"}

Rules:
- Pick ONE option (A or B). No "it depends".
- Make trade-offs explicit.
- Next7days must be actionable.
- If info is missing, make reasonable assumptions and list them.
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
      max_output_tokens: 700
    })
  });

  if (!resp.ok) {
    const errText = await resp.text();
    return new Response(`OpenAI error (${resp.status}): ${errText}`, { status: 502 });
  }

  const data = await resp.json();
  const text = extractTextFromResponses(data);

  let out;
  try {
    out = JSON.parse(text);
  } catch {
    const json = extractFirstJsonObject(text);
    if (!json) return new Response(`Model did not return JSON. Raw:\n${text}`, { status: 502 });
    try { out = JSON.parse(json); } catch { return new Response(`Failed to parse JSON. Raw:\n${text}`, { status: 502 }); }
  }

  if (!out || typeof out !== "object" || typeof out.decision !== "string") {
    return new Response(`Invalid output shape. Raw:\n${text}`, { status: 502 });
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