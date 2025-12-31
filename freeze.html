<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Plutox — Freeze a Decision</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin:0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; background:#fafafa; color:#111; }
    .container { max-width: 960px; margin: 0 auto; padding: 60px 20px; }
    h1 { margin: 0 0 10px; }
    p { color:#333; margin: 8px 0; }
    .muted { color:#666; }
    .pill { display:inline-block; padding: 4px 10px; border-radius: 999px; background:#f3f3f3; border:1px solid #e8e8e8; margin-right:8px; font-size: 12px; }

    .card {
      margin-top: 18px; background:#fff; border:1px solid #eee; border-radius: 12px; padding: 18px;
    }

    label { display:block; margin: 16px 0 6px; font-weight: 600; }
    input, textarea {
      width:100%; box-sizing:border-box; padding:12px; border:1px solid #ddd; border-radius:10px; background:#fff;
      font: inherit;
    }
    textarea { min-height: 90px; resize: vertical; }

    .row { display:grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    @media (max-width: 700px){ .row{ grid-template-columns: 1fr; } }

    .actions { display:flex; gap: 12px; align-items:center; flex-wrap: wrap; margin-top: 14px; }
    button {
      padding: 12px 16px; border: 0; border-radius: 10px;
      background:#111; color:#fff; font-weight: 700; cursor:pointer;
    }
    button.secondary {
      background:#f3f3f3; color:#111; border:1px solid #e8e8e8;
    }
    button:disabled { opacity: .6; cursor: not-allowed; }

    .grid2 { display:grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    @media (max-width: 700px){ .grid2{ grid-template-columns: 1fr; } }

    pre { white-space: pre-wrap; word-wrap: break-word; background:#0f0f0f; color:#fff; padding:14px; border-radius: 10px; overflow:auto; }
    .notice {
      border-left: 4px solid #111;
      padding: 10px 12px;
      background: #fafafa;
      border-radius: 10px;
      margin-top: 10px;
    }
    .q-list { margin: 10px 0 0; padding-left: 18px; }
    a.link { color:#111; font-weight:700; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div>
      <span class="pill">Plutox</span><span class="pill">Decision Freezer</span>
      <h1>Make sense → Freeze</h1>
      <p class="muted">Step 1: brain-dump. Step 2: Plutox organizes. Step 3: freeze with trade-offs and a 7-day plan.</p>
      <p class="muted"><a class="link" href="/">← Back</a></p>
    </div>

    <!-- Step 1: Free-write -->
    <div class="card" id="start">
      <h2 style="margin-top:0;">1) Free-write</h2>
      <p class="muted">Write freely. No structure required.</p>

      <textarea id="freewrite" placeholder="Write freely.
Messy thoughts are welcome.
You can rant, repeat yourself, or contradict yourself."></textarea>

      <div class="actions">
        <button id="btnOrganize" type="button">Organize my thoughts →</button>
        <button id="btnClear" class="secondary" type="button">Clear</button>
        <span id="status1" class="muted"></span>
      </div>

      <div id="missingBox" class="notice" style="display:none;">
        <strong>Quick questions (optional):</strong>
        <ul id="missingQs" class="q-list"></ul>
      </div>
    </div>

    <!-- Step 2: Structured form (auto-filled) -->
    <!-- IMPORTANT: hidden by default -->
    <form id="freezeForm" class="card" style="display:none;">
      <h2 style="margin-top:0;">2) Confirm structure</h2>
      <p class="muted">Plutox filled this. You can adjust anything before freezing.</p>

      <label>Decision statement</label>
      <textarea name="decision" required placeholder="One sentence: what decision is being made?"></textarea>

      <div class="row">
        <div>
          <label>Option A</label>
          <input name="optionA" required placeholder="Option A" />
        </div>
        <div>
          <label>Option B</label>
          <input name="optionB" required placeholder="Option B" />
        </div>
      </div>

      <label>Time horizon (when you’ll judge success)</label>
      <input name="horizon" required placeholder="e.g., 6 months" />

      <label>Non-negotiables</label>
      <textarea name="nonnegotiables" placeholder="Must-haves / must-avoid"></textarea>

      <label>Constraints</label>
      <textarea name="constraints" placeholder="Money/time/people/skills constraints"></textarea>

      <label>Biggest fears</label>
      <textarea name="fears" placeholder="What outcome scares you?"></textarea>

      <label>Primary goal</label>
      <textarea name="goal" placeholder="What do you want most?"></textarea>

      <div class="actions">
        <button id="btnFreeze" type="submit">Freeze this decision</button>
        <button id="btnHide" class="secondary" type="button">Hide form</button>
        <span id="status2" class="muted"></span>
      </div>
    </form>

    <!-- Step 3: Result -->
    <div id="result" class="card" style="display:none;"></div>
  </div>

  <script>
    const STORAGE_KEY = "plutox_freewrite_v1";

    const freewrite = document.getElementById('freewrite');
    const btnOrganize = document.getElementById('btnOrganize');
    const btnClear = document.getElementById('btnClear');
    const status1 = document.getElementById('status1');

    const form = document.getElementById('freezeForm');
    const btnFreeze = document.getElementById('btnFreeze');
    const btnHide = document.getElementById('btnHide');
    const status2 = document.getElementById('status2');
    const resultEl = document.getElementById('result');

    const missingBox = document.getElementById('missingBox');
    const missingQs = document.getElementById('missingQs');

    function esc(s){ return (s ?? '').toString().replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

    // Restore free-write from homepage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) freewrite.value = saved;
    } catch (e) {}

    freewrite.addEventListener("input", () => {
      try { localStorage.setItem(STORAGE_KEY, freewrite.value); } catch (e) {}
    });

    btnClear.addEventListener("click", () => {
      freewrite.value = "";
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      status1.textContent = "";
      missingBox.style.display = "none";
      missingQs.innerHTML = "";
      resultEl.style.display = "none";
      form.style.display = "none";
      status2.textContent = "";
    });

    btnHide.addEventListener("click", () => {
      form.style.display = "none";
      status2.textContent = "";
    });

    btnOrganize.addEventListener('click', async () => {
      resultEl.style.display = 'none';
      missingBox.style.display = "none";
      missingQs.innerHTML = "";

      const text = (freewrite.value || "").trim();
      if (!text) {
        status1.textContent = "Please write something first.";
        return;
      }

      // disable UI while calling
      btnOrganize.disabled = true;
      btnClear.disabled = true;
      btnFreeze.disabled = true;
      btnHide.disabled = true;

      status1.textContent = "Reading and organizing your thoughts…";

      try {
        const resp = await fetch('/api/organize', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ text })
        });

        if (!resp.ok) {
          const txt = await resp.text();
          throw new Error(`API error (${resp.status}): ${txt}`);
        }

        const out = await resp.json();
        fillForm(out);

        status1.textContent = "Done. Confirm the structure below.";
        form.scrollIntoView({behavior:'smooth', block:'start'});
      } catch (err) {
        status1.textContent = "Error: " + (err?.message || err);
      } finally {
        btnOrganize.disabled = false;
        btnClear.disabled = false;
        btnFreeze.disabled = false;
        btnHide.disabled = false;
      }
    });

    function fillForm(o){
      // Fill fields
      form.elements.decision.value = o.decision || "";
      form.elements.optionA.value = o.optionA || "";
      form.elements.optionB.value = o.optionB || "";
      form.elements.horizon.value = o.horizon || "";
      form.elements.nonnegotiables.value = o.nonnegotiables || "";
      form.elements.constraints.value = o.constraints || "";
      form.elements.fears.value = o.fears || "";
      form.elements.goal.value = o.goal || "";

      // Show optional questions
      const qs = Array.isArray(o.missing_questions) ? o.missing_questions : [];
      if (qs.length) {
        missingQs.innerHTML = qs.map(q => `<li>${esc(q)}</li>`).join("");
        missingBox.style.display = "block";
      } else {
        missingBox.style.display = "none";
        missingQs.innerHTML = "";
      }

      // ⭐ KEY CHANGE: show form only after organize
      form.style.display = "block";
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      resultEl.style.display = 'none';
      status2.textContent = "";

      btnFreeze.disabled = true;
      btnOrganize.disabled = true;
      btnClear.disabled = true;
      btnHide.disabled = true;

      status2.textContent = "Freezing…";

      const data = Object.fromEntries(new FormData(form).entries());

      try {
        const resp = await fetch('/api/freeze', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        });

        if (!resp.ok) {
          const txt = await resp.text();
          throw new Error(`API error (${resp.status}): ${txt}`);
        }

        const out = await resp.json();
        render(out);
        status2.textContent = "Done.";
      } catch (err) {
        status2.textContent = "Error: " + (err?.message || err);
      } finally {
        btnFreeze.disabled = false;
        btnOrganize.disabled = false;
        btnClear.disabled = false;
        btnHide.disabled = false;
      }
    });

    function render(out){
      const decision = out.decision || '(no decision)';
      const summary = out.summary || '';
      const assumptions = Array.isArray(out.assumptions) ? out.assumptions : [];
      const tradeoffs = Array.isArray(out.tradeoffs) ? out.tradeoffs : [];
      const next7days = Array.isArray(out.next7days) ? out.next7days : [];
      const fallback = out.fallback || '';

      const li = (arr) => arr.map(x => `<li>${esc(x)}</li>`).join('');

      resultEl.innerHTML = `
        <h2 style="margin-top:0;">Frozen decision</h2>
        <p style="font-size:1.15rem;"><strong>${esc(decision)}</strong></p>
        ${summary ? `<p class="muted">${esc(summary)}</p>` : ''}

        <div class="grid2">
          <div>
            <h3>Assumptions</h3>
            <ul>${assumptions.length ? li(assumptions) : '<li class="muted">None provided</li>'}</ul>
          </div>
          <div>
            <h3>Trade-offs</h3>
            <ul>${tradeoffs.length ? li(tradeoffs) : '<li class="muted">None provided</li>'}</ul>
          </div>
        </div>

        <h3>Next 7 days plan</h3>
        <ol>${next7days.length ? next7days.map(x => `<li>${esc(x)}</li>`).join('') : '<li class="muted">None provided</li>'}</ol>

        ${fallback ? `<h3>If wrong, fallback</h3><p>${esc(fallback)}</p>` : ''}

        <details style="margin-top:14px;">
          <summary class="muted">Raw JSON</summary>
          <pre>${esc(JSON.stringify(out, null, 2))}</pre>
        </details>
      `;

      resultEl.style.display = 'block';
      resultEl.scrollIntoView({behavior:'smooth', block:'start'});
    }
  </script>
</body>
</html>