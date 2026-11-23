// Dependency floors: every copy of a listed package that package-lock.json
// resolves (nested copies included) must be at or above its floor.
// Minimum versions only — never an exact version. A package that is no longer
// installed passes. Each refresh only edits the table below: raise a floor or
// add a line, never lower or remove one.
//
// Run: node builder/checks/dependency-floors.check.mjs
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// package -> [floor, reason, week]
export const FLOORS = {
  '@koehler8/cms': ['1.5.4', 'in-range baseline: devDependency ^1.5.4 (locked at its floor)', '2026-11-23'],
};

function parse(v) {
  const m = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+.*)?$/.exec(v);
  if (!m) throw new Error(`unparseable version: ${v}`);
  return { core: [Number(m[1]), Number(m[2]), Number(m[3])], pre: m[4] ? m[4].split('.') : [] };
}

// semver ordering: negative if a < b
export function compare(a, b) {
  const x = parse(a);
  const y = parse(b);
  for (let i = 0; i < 3; i++) if (x.core[i] !== y.core[i]) return x.core[i] - y.core[i];
  if (!x.pre.length || !y.pre.length) return y.pre.length - x.pre.length;
  for (let i = 0; i < Math.max(x.pre.length, y.pre.length); i++) {
    const p = x.pre[i];
    const q = y.pre[i];
    if (p === undefined) return -1;
    if (q === undefined) return 1;
    if (p === q) continue;
    const pn = /^\d+$/.test(p);
    const qn = /^\d+$/.test(q);
    if (pn && qn) return Number(p) - Number(q);
    if (pn) return -1;
    if (qn) return 1;
    return p < q ? -1 : 1;
  }
  return 0;
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const lockPath = process.env.FLOORS_LOCKFILE || join(root, 'package-lock.json');
const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
const failures = [];

for (const [path, entry] of Object.entries(lock.packages ?? {})) {
  const i = path.lastIndexOf('node_modules/');
  if (i === -1 || !entry.version) continue;
  const name = path.slice(i + 'node_modules/'.length);
  const row = FLOORS[name];
  if (!row) continue;
  if (compare(entry.version, row[0]) < 0) {
    failures.push(`${path} resolves ${entry.version}, below floor ${row[0]} (${row[1]}, ${row[2]})`);
  }
}

if (failures.length) {
  console.error('dependency floors violated:\n  ' + failures.join('\n  '));
  process.exit(1);
}
console.log(`dependency floors ok (${Object.keys(FLOORS).length} listed)`);
