# Claude Code Audit & Fix Prompt for lotofacilresultado.com

Copy everything below and paste it into a new Claude Code session.

---

## Prompt

You are auditing and fixing the Brazilian lottery results website at `lotofacilresultado.com`. The codebase is a Next.js App Router project with TypeScript and Tailwind CSS, deployed on Vercel.

### CRITICAL METHODOLOGY — DO NOT SKIP

**Past sessions failed because Claude grepped source files, edited them, and reported "done" — but the deployed site didn't change.** The root cause: the wrong files were edited, or edits didn't affect the rendered output.

You MUST follow this exact workflow for EVERY fix:

#### Step 1: VERIFY THE PROBLEM EXISTS ON THE LIVE SITE
Use the Chrome MCP tools (Claude in Chrome) to navigate to the live page and run JavaScript to check if the problem actually exists in the **rendered DOM**:

```
// Example: check for unaccented Portuguese words on the live page
const text = document.body.innerText;
const html = document.documentElement.innerHTML;
const problems = {
  'example_issue': text.includes('problematic string'),
};
JSON.stringify(problems);
```

If the problem doesn't exist on the live site, SKIP IT. Do not fix phantom issues.

#### Step 2: TRACE THE PROBLEM TO THE ACTUAL SOURCE FILE
Once you confirm a problem exists in the rendered output:
1. Use the Chrome JS console to find the exact surrounding HTML context
2. Grep the codebase for that exact context string (not just the problem word)
3. Read the file to confirm it's the right one
4. Check if the file is a server component or client component (`'use client'`)

#### Step 3: FIX THE SOURCE FILE
Edit the confirmed source file using the Edit tool.

#### Step 4: BUILD AND DEPLOY
```bash
cd "D:\My Personal\lottery results project\esultadosmegasena.com.br"
npx next build 2>&1 | tail -35
npx vercel --prod 2>&1 | tail -15
```

#### Step 5: VERIFY THE FIX ON THE LIVE SITE
Navigate to the page again in Chrome and re-run the same JavaScript check from Step 1. The problem count must be 0.

**DO NOT mark a fix as done until Step 5 passes.**

---

### KNOWN ISSUE PATTERNS TO CHECK

#### 1. Portuguese Accent Errors (most common)
Search the live rendered text for unaccented Portuguese words. Common ones:

| Wrong | Correct | Context |
|-------|---------|---------|
| `Voce` | `Você` | "Voce pode..." |
| `e a mais` | `é a mais` | verb "to be" |
| `e fundamental` | `é fundamental` | verb "to be" |
| `e proibida` | `é proibida` | verb "to be" |
| `nao` | `não` | "nao pode..." |
| `tambem` | `também` | "tambem nos..." |
| `legislacao` | `legislação` | legal pages |
| `informacao` | `informação` | legal pages |
| `correcao` | `correção` | legal pages |
| `seguranca` | `segurança` | legal pages |
| `Milionaria` | `Milionária` | lottery name |
| `numero` | `número` | "numero sorteado" |
| `bolao/boloes` | `bolão/bolões` | "bolao de loteria" |

JavaScript to scan a page:
```javascript
const text = document.body.innerText;
const errors = {};
const patterns = [
  ['Voce', /\bVoce\b/g],
  ['voce', /\bvoce\b/g],
  ['nao_verb', /\bnao\b/g],
  ['tambem', /\btambem\b/gi],
  ['legislacao', /legislacao/g],
  ['informacao', /informacao/g],
  ['seguranca', /seguranca/g],
  ['Milionaria_no_accent', /Milionaria(?![\u0300-\u036fá])/g],
];
for (const [name, regex] of patterns) {
  const m = text.match(regex);
  if (m) errors[name] = m.length;
}
JSON.stringify({ errorCount: Object.keys(errors).length, errors });
```

#### 2. Wrong Draw Time (20:00 vs 21:00)
All lotteries draw at 21:00 BRT. Search for `20:00` or `20h`:
```javascript
const text = document.body.innerText;
JSON.stringify({
  has_20_00: text.includes('20:00'),
  has_20h: /\b20h\b/.test(text),
});
```

#### 3. Unicode Escape Sequences
Check for literal `\u00XX` strings in rendered text (NOT in RSC payload):
```javascript
const text = document.body.innerText;
const escaped = text.match(/\\u[0-9a-fA-F]{4}/g);
JSON.stringify({ escaped: escaped || 'none' });
```
Note: `\u0026` in HTML source is normal (Next.js RSC payload encoding for `&`). Only flag escapes visible in `innerText`.

#### 4. "Carregando..." Text
Loading spinners should show only the spinner animation, no text:
```javascript
JSON.stringify({ carregando: document.body.innerText.includes('Carregando') });
```

---

### IMPORTANT CAVEATS

1. **Streaming SSR delay**: Pages using `force-dynamic` stream content. If you check `document.body.innerText` immediately after navigation, you may only see 648 chars (nav+footer). Wait for `document.readyState === 'complete'` or check `document.documentElement.innerHTML` which includes the full streamed response.

2. **RSC payload is not a bug**: The HTML source contains React Server Component payloads with escaped unicode like `\u0026` (ampersand). These are internal framework strings, NOT rendering bugs.

3. **Build cost sensitivity**: User is on Vercel Standard plan ($0.014/min). Batch fixes before deploying. Don't deploy after every single change.

4. **All pages use `force-dynamic`**: This prevents build-time API calls that cause timeouts. Do NOT add `revalidate` or `generateStaticParams` to any page.

5. **API may be geo-blocked**: The lottery API (`loteriascaixa-api.herokuapp.com`) may not respond from US servers. Pages will still render their static content (FAQ, SEO text, etc.) even when the API fails.

6. **Key files**:
   - `src/lib/constants.ts` — all game configs (draw times, odds, etc.)
   - `src/app/layout.tsx` — root layout with schemas and GA
   - `src/app/page.tsx` — homepage
   - `src/app/(pages)/[game]/page.tsx` — individual game pages
   - `vercel.json` — redirects and cron config

---

### PAGES TO AUDIT (in priority order)

1. `/` (homepage) — schedule table, hero text, result cards
2. `/mega-sena` — game page with FAQ, SEO content, prize table
3. `/lotofacil` — same structure as mega-sena
4. `/como-jogar` — how-to guide with 9 game sections
5. `/faq` — 16 FAQ items
6. `/conferidor` — ticket checker tool
7. `/simulador` — bet simulator tool
8. `/privacidade` — privacy policy (heavy text)
9. `/termos` — terms of use (heavy text)
10. `/aviso-legal` — legal disclaimer
11. `/jogo-responsavel` — responsible gaming
12. `/contato` — contact page
13. `/sobre` — about page
14. `/previsoes` — predictions (uses seeded RNG — watch for infinite loops)
15. `/historico` — history page
16. `/blog` — blog listing
