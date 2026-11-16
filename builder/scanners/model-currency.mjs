// builder/scanners/model-currency.mjs (per repo) — observe flags the Claude
// models this repository names that fell behind their family's newest
// release, are deprecated or retiring, or do not exist. Seeded by buildmill's
// "Seed builder facets" item (core onboarding.ts); refresh it from there when
// buildmill's model lifecycle table moves.
//
// It reads only this repository's files and Anthropic's Models API — never
// org config (workflow stages, observe policies, license probes), which
// buildmill's own scanner checks once per sweep. Report-only: it never edits a
// file; which model a location runs is the operator's call.
//
// A model ID counts when it is a whole quoted literal in code, or anywhere in
// Markdown, YAML, shell and other text files. Pins: builder/model-pins.json,
// [{"location": "src/agent.ts" or "src/agent.ts:12", "id": "<model id>",
// "reason": "why it is held"}], suppresses that location's finding; a retired
// model breaks the call outright, so no pin holds it.
//
// Models API credential: ANTHROPIC_API_KEY, else CLAUDE_CODE_OAUTH_TOKEN or
// ANTHROPIC_AUTH_TOKEN. BUILDMILL_MODELS_URL overrides the endpoint and
// BUILDMILL_NOW (ISO 8601) the clock. When the API cannot be read it files
// one "model currency not checked" finding and the table below decides alone.
// Pure JSON findings on stdout.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// --- the lifecycle table and verdict (buildmill core models.ts) ----------------
const MODEL_LIFECYCLE = [
  { id: "claude-3-haiku-20240307", family: "haiku", order: 1, deprecatedAt: null, retiresAt: "2026-04-20T00:00:00Z", successor: "claude-3-5-haiku-20241022", price: { in: 0.25, out: 1.25 } },
  { id: "claude-3-5-haiku-20241022", family: "haiku", order: 2, deprecatedAt: null, retiresAt: "2026-02-19T00:00:00Z", successor: "claude-haiku-4-5-20251001", price: { in: 0.8, out: 4 } },
  { id: "claude-haiku-4-5-20251001", family: "haiku", order: 3, deprecatedAt: null, retiresAt: null, successor: "claude-haiku-5-5", price: { in: 1, out: 5 } },
  { id: "claude-haiku-5-5", family: "haiku", order: 4, deprecatedAt: null, retiresAt: null, successor: null, price: { in: 0.1, out: 0.5 } },
  { id: "claude-3-sonnet-20240229", family: "sonnet", order: 1, deprecatedAt: null, retiresAt: "2025-07-21T00:00:00Z", successor: "claude-3-5-sonnet-20240620", price: { in: 3, out: 15 } },
  { id: "claude-3-5-sonnet-20240620", family: "sonnet", order: 2, deprecatedAt: null, retiresAt: "2025-10-28T00:00:00Z", successor: "claude-3-5-sonnet-20241022", price: { in: 3, out: 15 } },
  { id: "claude-3-5-sonnet-20241022", family: "sonnet", order: 3, deprecatedAt: null, retiresAt: "2025-10-28T00:00:00Z", successor: "claude-3-7-sonnet-20250219", price: { in: 3, out: 15 } },
  { id: "claude-3-7-sonnet-20250219", family: "sonnet", order: 4, deprecatedAt: null, retiresAt: "2026-02-19T00:00:00Z", successor: "claude-sonnet-4-20250514", price: { in: 3, out: 15 } },
  { id: "claude-sonnet-4-20250514", family: "sonnet", order: 5, deprecatedAt: null, retiresAt: "2026-06-15T00:00:00Z", successor: "claude-sonnet-4-5-20250929", price: { in: 3, out: 15 } },
  { id: "claude-sonnet-4-5-20250929", family: "sonnet", order: 6, deprecatedAt: null, retiresAt: "2026-11-30T00:00:00Z", successor: "claude-sonnet-4-6", price: { in: 3, out: 15 } },
  { id: "claude-sonnet-4-6", family: "sonnet", order: 7, deprecatedAt: null, retiresAt: null, successor: "claude-sonnet-5", price: { in: 3, out: 15 } },
  { id: "claude-sonnet-5", family: "sonnet", order: 8, deprecatedAt: null, retiresAt: null, successor: "claude-sonnet-5-5", price: { in: 2, out: 10 } },
  { id: "claude-sonnet-5-5", family: "sonnet", order: 9, deprecatedAt: null, retiresAt: null, successor: null, price: { in: 2, out: 10 } },
  { id: "claude-3-opus-20240229", family: "opus", order: 1, deprecatedAt: null, retiresAt: "2026-01-05T00:00:00Z", successor: "claude-opus-4-20250514", price: { in: 15, out: 75 } },
  { id: "claude-opus-4-20250514", family: "opus", order: 2, deprecatedAt: null, retiresAt: "2026-06-15T00:00:00Z", successor: "claude-opus-4-1-20250805", price: { in: 15, out: 75 } },
  { id: "claude-opus-4-1-20250805", family: "opus", order: 3, deprecatedAt: null, retiresAt: "2026-08-05T00:00:00Z", successor: "claude-opus-4-5-20251101", price: { in: 15, out: 75 } },
  { id: "claude-opus-4-5-20251101", family: "opus", order: 4, deprecatedAt: null, retiresAt: null, successor: "claude-opus-4-6", price: { in: 5, out: 25 } },
  { id: "claude-opus-4-6", family: "opus", order: 5, deprecatedAt: null, retiresAt: null, successor: "claude-opus-4-7", price: { in: 5, out: 25 } },
  { id: "claude-opus-4-7", family: "opus", order: 6, deprecatedAt: null, retiresAt: null, successor: "claude-opus-4-8", price: { in: 5, out: 25 } },
  { id: "claude-opus-4-8", family: "opus", order: 7, deprecatedAt: null, retiresAt: null, successor: "claude-opus-5", price: { in: 5, out: 25 } },
  { id: "claude-opus-5", family: "opus", order: 8, deprecatedAt: null, retiresAt: null, successor: "claude-opus-5-5", price: { in: 5, out: 25 } },
  { id: "claude-opus-5-5", family: "opus", order: 9, deprecatedAt: null, retiresAt: null, successor: null, price: { in: 4, out: 20 } },
  { id: "claude-fable-5", family: "fable", order: 1, deprecatedAt: null, retiresAt: null, successor: "claude-fable-5-1", price: { in: 10, out: 50 } },
  { id: "claude-fable-5-1", family: "fable", order: 2, deprecatedAt: null, retiresAt: null, successor: null, price: { in: 10, out: 50 } },
];
const MODEL_CLI_ALIASES = ["haiku", "sonnet", "opus", "fable", "opusplan"];
const RETIRING_HIGH_DAYS = 90;
const RETIRING_CRITICAL_DAYS = 30;
const DAY_MS = 86400000;

function lifecycleEntry(norm) {
  return MODEL_LIFECYCLE.find((e) => e.id === norm)
    || MODEL_LIFECYCLE.find((e) => e.id.startsWith(norm + "-") && /^\d{8}$/.test(e.id.slice(norm.length + 1)))
    || null;
}

function modelCurrency(id, live, now) {
  const norm = String(id).trim().replace(/\[1m\]$/i, "");
  const make = (state, severity, entry, suggested) => ({
    id,
    state,
    severity,
    suggested: suggested ? suggested.id : null,
    priceDelta: entry && suggested && entry.price && suggested.price
      ? { in: Math.round((suggested.price.in - entry.price.in) * 1e6) / 1e6, out: Math.round((suggested.price.out - entry.price.out) * 1e6) / 1e6 }
      : null,
    retiresAt: entry ? entry.retiresAt : null,
  });
  if (MODEL_CLI_ALIASES.includes(norm.toLowerCase())) return make("current", null, null, null);
  const entry = lifecycleEntry(norm);
  if (!entry) return live !== null && live.has(norm) ? make("current", null, null, null) : make("unknown", "critical", null, null);
  const at = (d) => (d === null ? NaN : Date.parse(d));
  const retired = (e) => e.retiresAt !== null && at(e.retiresAt) <= now;
  const deprecated = (e) => (e.deprecatedAt !== null ? at(e.deprecatedAt) <= now : e.retiresAt !== null);
  const usable = (e) => !retired(e) && !deprecated(e) && (live === null || live.has(e.id));
  let newest = null;
  for (const e of MODEL_LIFECYCLE) {
    if (e.family === entry.family && e.order > entry.order && usable(e) && (newest === null || e.order > newest.order)) newest = e;
  }
  const served = live === null || live.has(entry.id) || live.has(norm);
  const left = entry.retiresAt === null ? Infinity : at(entry.retiresAt) - now;
  if (left <= 0 || !served) return make("retired", "critical", entry, newest);
  if (left <= RETIRING_CRITICAL_DAYS * DAY_MS) return make("retiring", "critical", entry, newest);
  if (left <= RETIRING_HIGH_DAYS * DAY_MS) return make("retiring", "high", entry, newest);
  if (deprecated(entry)) return make("deprecated", "medium", entry, newest);
  if (newest) return make("newer-available", "low", entry, newest);
  return make("current", null, entry, null);
}

// --- the clock, the Models API, pins -----------------------------------------
const NOW = (() => {
  const raw = (process.env.BUILDMILL_NOW || "").trim();
  const t = raw ? Date.parse(raw) : NaN;
  return Number.isFinite(t) ? t : Date.now();
})();
const MODELS_URL = (process.env.BUILDMILL_MODELS_URL || "").trim() || "https://api.anthropic.com/v1/models";

async function liveModels() {
  const key = (process.env.ANTHROPIC_API_KEY || "").trim();
  const token = (process.env.CLAUDE_CODE_OAUTH_TOKEN || process.env.ANTHROPIC_AUTH_TOKEN || "").trim();
  if (!key && !token) return { ids: null, why: "no credential on this host (ANTHROPIC_API_KEY, CLAUDE_CODE_OAUTH_TOKEN or ANTHROPIC_AUTH_TOKEN)" };
  const headers = { "anthropic-version": "2023-06-01" };
  if (key) headers["x-api-key"] = key;
  else { headers.authorization = "Bearer " + token; headers["anthropic-beta"] = "oauth-2025-04-20"; }
  const ids = [];
  let after = null;
  try {
    for (let page = 0; page < 20; page++) {
      const url = new URL(MODELS_URL);
      url.searchParams.set("limit", "1000");
      if (after) url.searchParams.set("after_id", after);
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(20000) });
      const body = await res.text();
      if (!res.ok) return { ids: null, why: "HTTP " + res.status + " " + body.slice(0, 160) };
      const json = JSON.parse(body);
      for (const m of Array.isArray(json.data) ? json.data : []) if (m && typeof m.id === "string") ids.push(m.id);
      if (!json.has_more || !json.last_id) break;
      after = json.last_id;
    }
  } catch (err) {
    return { ids: null, why: String((err && err.message) || err).slice(0, 200) };
  }
  if (!ids.length) return { ids: null, why: "the API listed no models" };
  return { ids, why: null };
}

function notChecked(why) {
  return {
    title: "model currency not checked — the Anthropic Models API could not be read",
    severity: "medium",
    detail: "The Models API (" + MODELS_URL + ") did not answer from this host: " + why + ". Every model ID was judged against the checked-in lifecycle table alone, so a model Anthropic released, deprecated or retired since the table's last edit is not reflected, and an ID the table does not know reads as unknown.\n\nDone-when: the Models API answers from the runner host — ANTHROPIC_API_KEY, or a CLAUDE_CODE_OAUTH_TOKEN the API accepts, in the runner's environment.",
  };
}

const PINS_FILE = "builder/model-pins.json";
function loadPins(findings) {
  if (!existsSync(PINS_FILE)) return [];
  try {
    const pins = JSON.parse(readFileSync(PINS_FILE, "utf8"));
    if (!Array.isArray(pins)) throw new Error("expected a JSON array of {location, id, reason}");
    return pins.filter((p) => p && typeof p.location === "string" && typeof p.id === "string" && typeof p.reason === "string" && p.reason.trim());
  } catch (err) {
    findings.push({
      title: "model currency: " + PINS_FILE + " is unreadable",
      severity: "medium",
      detail: PINS_FILE + " did not parse (" + String((err && err.message) || err).slice(0, 200) + "), so no pin held anything this sweep.\n\nDone-when: " + PINS_FILE + " is a JSON array of {location, id, reason}.",
    });
    return [];
  }
}
const isPinned = (pins, location, id) => pins.some((p) => p.id === id && (p.location === location || p.location === location.replace(/:\d+$/, "")));

// --- what a finding says -----------------------------------------------------
function bucket(v) {
  if (v.state === "retiring") return v.severity === "critical" ? "retiring ≤" + RETIRING_CRITICAL_DAYS + "d" : "retiring ≤" + RETIRING_HIGH_DAYS + "d";
  return v.state;
}
const dollars = (n) => (n < 0 ? "-$" : "+$") + Math.abs(n);
function finding(location, titleLocation, pinLocation, id, v, where) {
  const norm = String(id).trim().replace(/\[1m\]$/i, "");
  const cur = lifecycleEntry(norm);
  const sug = v.suggested ? lifecycleEntry(v.suggested) : null;
  const days = v.retiresAt ? Math.ceil((Date.parse(v.retiresAt) - NOW) / DAY_MS) : null;
  const why = {
    "newer-available": "a newer " + (cur ? cur.family : "") + " model is available",
    deprecated: "Anthropic has deprecated it" + (v.retiresAt ? " (retires " + v.retiresAt.slice(0, 10) + ")" : ""),
    retiring: "it retires on " + (v.retiresAt || "?").slice(0, 10) + ", in " + days + " day(s) — a stage on it fails from then on",
    retired: v.retiresAt && Date.parse(v.retiresAt) <= NOW
      ? "it retired on " + v.retiresAt.slice(0, 10) + " — a call on it fails"
      : "the Models API no longer serves it — a call on it fails",
    unknown: "neither Anthropic's Models API nor the lifecycle table knows this ID — a call on it fails",
  }[v.state];
  const lines = [
    location + " uses " + id + ": " + why + ".",
    "Location: " + where.join(", "),
    "Current ID: " + id,
    "Suggested ID: " + (v.suggested || "none — no newer usable model in its family"),
  ];
  if (v.priceDelta && cur && sug) {
    lines.push("Price difference (suggested − current, $/MTok input/output): " + dollars(v.priceDelta.in) + " / " + dollars(v.priceDelta.out) + " ($" + cur.price.in + "/$" + cur.price.out + " → $" + sug.price.in + "/$" + sug.price.out + ")");
  }
  lines.push(
    "",
    "Report-only: nothing was changed, and which model this location runs is the operator's call. To hold it on " + id + " deliberately, add {\"location\": \"" + pinLocation + "\", \"id\": \"" + id + "\", \"reason\": \"...\"} to " + PINS_FILE + " (a retired model cannot be pinned).",
    "",
    "Done-when: " + titleLocation + " names a current model, or a pin with a reason holds it.",
  );
  return {
    title: "model currency: " + titleLocation + " uses " + id + " (" + bucket(v) + ")",
    severity: v.severity,
    detail: lines.join("\n"),
    location,
    currentId: id,
    suggestedId: v.suggested,
  };
}

// --- model IDs checked into the repository -----------------------------------
// Family-shaped IDs only (claude-<family>-<n>…, or the legacy claude-<n>-<family>…),
// so claude-code/<version> and @anthropic-ai/claude-code are never filed.
const ID_RE = /(?<![A-Za-z0-9_-])claude-(?:(?:haiku|sonnet|opus|fable)-[0-9](?:[0-9a-z.-]*[0-9a-z])?|[0-9](?:-[0-9])?-(?:haiku|sonnet|opus)(?:-[0-9a-z.-]*[0-9a-z])?)(?:\[1m\])?/g;
const BT = String.fromCharCode(96);
const QUOTES = ["\"", "'", BT];
const SCRIPT_EXT = /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs|vue|svelte|astro)$/;
const CODE_EXT = /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs|vue|svelte|astro|py|rb|go|rs|java|kt|swift|php|cs|json|jsonc)$/;
const TEXT_EXT = /\.(md|mdx|markdown|txt|ya?ml|toml|ini|cfg|conf|env|sh|bash|zsh|plist|properties)$/;
const TEXT_NAMES = /^(\.env(\..+)?|Dockerfile|Makefile|Procfile)$/;
const SKIP_DIRS = new Set(["node_modules", "dist", "build", "coverage", "out", "vendor", "venv", "__pycache__", "test", "tests", "__tests__", "spec"]);
const SKIP_FILES = /^(package-lock\.json|npm-shrinkwrap\.json|yarn\.lock|pnpm-lock\.yaml|CHANGELOG(\..+)?)$|\.(test|spec)\.[a-z]+$|_test\.go$|^test_.+\.py$/i;

function walk(dir, out, top) {
  let names;
  try { names = readdirSync(dir); } catch { return; }
  for (const name of names.sort()) {
    const rel = dir === "." ? name : join(dir, name);
    let st;
    try { st = statSync(rel); } catch { continue; }
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name) || (name.startsWith(".") && name !== ".github")) continue;
      if (top && dir === "." && name === "builder") continue; // buildmill's own facets, scanners and pins
      walk(rel, out, top);
    } else if (st.isFile() && st.size <= 1024 * 1024 && !SKIP_FILES.test(name) && (CODE_EXT.test(name) || TEXT_EXT.test(name) || TEXT_NAMES.test(name))) {
      out.push(rel.split("\\").join("/"));
    }
  }
  return out;
}

// The end of a string or template literal starting at i (its closing quote).
function endOfString(src, i) {
  const q = src[i];
  for (let j = i + 1; j < src.length; j++) {
    if (src[j] === "\\") { j++; continue; }
    if (src[j] === q) return j;
    if (q !== BT && src[j] === "\n") return j;
  }
  return src.length - 1;
}
// The end of a declaration's initializer starting at i: its closing bracket,
// its one string or template literal, or the first ; at depth 0.
function endOfValue(src, i) {
  let depth = 0;
  let opened = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === "/" && src[i + 1] === "/") { const j = src.indexOf("\n", i); if (j < 0) return src.length - 1; i = j; continue; }
    if (c === "/" && src[i + 1] === "*") { const j = src.indexOf("*/", i + 2); if (j < 0) return src.length - 1; i = j + 1; continue; }
    if (QUOTES.includes(c)) { i = endOfString(src, i); if (depth === 0) return i; continue; }
    if (c === "(" || c === "[" || c === "{") { depth++; opened = true; continue; }
    if (c === ")" || c === "]" || c === "}") { depth--; if (opened && depth <= 0) return i; continue; }
    if (c === ";" && depth === 0) return i;
  }
  return src.length - 1;
}
// 1-based [first, last] line ranges that hold model data, not model usage: the
// lifecycle catalog and the scanner template that embeds a copy of it.
function dataRegions(src) {
  const regions = [];
  const decl = /\b(?:const|let|var)\s+(?:MODEL_LIFECYCLE|MODEL_CURRENCY_SCANNER_TEMPLATE)\b/g;
  const lineAt = (pos) => src.slice(0, pos).split("\n").length;
  let m;
  while ((m = decl.exec(src))) {
    let i = m.index + m[0].length;
    while (i < src.length && !(src[i] === "=" && src[i + 1] !== "=" && src[i + 1] !== ">")) i++;
    const end = endOfValue(src, i + 1);
    regions.push([lineAt(m.index), lineAt(end)]);
    decl.lastIndex = end + 1;
  }
  return regions;
}

function literalsIn(rel, src) {
  const bare = !CODE_EXT.test(rel);
  const skip = SCRIPT_EXT.test(rel) ? dataRegions(src) : [];
  const out = [];
  src.split("\n").forEach((line, idx) => {
    const n = idx + 1;
    if (skip.some(([a, b]) => n >= a && n <= b)) return;
    const seen = new Set();
    for (const m of line.matchAll(ID_RE)) {
      const id = m[0];
      if (!bare) {
        const q = line[m.index - 1];
        if (!QUOTES.includes(q) || line[m.index + id.length] !== q) continue;
      }
      if (seen.has(id)) continue;
      seen.add(id);
      out.push({ line: n, id });
    }
  });
  return out;
}

// Repo-literal findings: one per (file, id, bucket), at its first line; the
// detail names every line.
function repoFindings(roots, live, pins) {
  const hits = [];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const rel of walk(root, [], root === ".")) {
      let src;
      try { src = readFileSync(rel, "utf8"); } catch { continue; }
      if (src.includes("\u0000")) continue;
      for (const h of literalsIn(rel, src)) {
        const v = modelCurrency(h.id, live, NOW);
        if (v.state === "current") continue;
        const location = rel + ":" + h.line;
        if (v.state !== "retired" && isPinned(pins, location, h.id)) continue;
        hits.push({ rel, location, id: h.id, v });
      }
    }
  }
  const filed = new Set();
  return hits.flatMap((h) => {
    const key = h.rel + " " + h.id + " " + bucket(h.v);
    if (filed.has(key)) return [];
    filed.add(key);
    const where = hits.filter((o) => o.rel === h.rel && o.id === h.id && bucket(o.v) === bucket(h.v)).map((o) => o.location);
    return [finding(h.location, h.rel, h.rel, h.id, h.v, where)];
  });
}

// --- the sweep ---------------------------------------------------------------
const findings = [];
const api = await liveModels();
if (api.ids === null) findings.push(notChecked(api.why));
const live = api.ids === null ? null : new Set(api.ids);
const pins = loadPins(findings);
findings.push(...repoFindings(["."], live, pins));
// flushed before exit: a pipe write is asynchronous on macOS
await new Promise((resolve) => process.stdout.write(JSON.stringify(findings), resolve));
