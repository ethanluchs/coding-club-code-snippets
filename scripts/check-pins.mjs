/**
 * Build-time guard: catches a snippet whose code disagrees with the pin map.
 *
 *  1. Every pin number appearing in a sketch must be one we actually use.
 *  2. No two components may share a pin within one sketch.
 *  3. Snippet ids must be unique and weeks must be 1-6.
 *
 * Run: npm run check-pins  (also runs as part of npm run build)
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const SNIPPET_FILE = join(process.cwd(), "content", "snippets.ts");
const PINS_FILE = join(process.cwd(), "content", "pins.ts");

const fail = [];
const warn = [];

// --- pull the allowed pin numbers out of pins.ts ---
const pinsSrc = readFileSync(PINS_FILE, "utf8");
const allowed = new Set(
  [...pinsSrc.matchAll(/^\s*(?:signal|trig|echo|ena|in[1-4]|enb):\s*(\d+)/gm)].map(
    (m) => Number(m[1]),
  ),
);

if (allowed.size === 0) {
  fail.push("pins.ts: could not read any pin numbers");
}

// --- scan the snippet file ---
const seenIds = new Set();

for (const file of ["snippets.ts"]) {
  const src = readFileSync(SNIPPET_FILE, "utf8");

  // ids unique
  for (const m of src.matchAll(/^\s*id:\s*["'`]([^"'`]+)["'`]/gm)) {
    const id = m[1];
    if (seenIds.has(id)) fail.push(`${file}: duplicate snippet id "${id}"`);
    seenIds.add(id);
  }

  // weeks in range
  for (const m of src.matchAll(/^\s*week:\s*(\d+)/gm)) {
    const w = Number(m[1]);
    if (w < 1 || w > 6) fail.push(`${file}: week ${w} out of range 1-6`);
  }

  // A bare number inside pinMode/digitalWrite/analogWrite/attach/pulseIn
  // means someone hardcoded a pin instead of interpolating from PINS.
  const callRe =
    /\b(pinMode|digitalWrite|analogWrite|pulseIn|attach)\(\s*(\d+)/g;
  for (const m of src.matchAll(callRe)) {
    const [, fn, num] = m;
    warn.push(
      `${file}: ${fn}(${num}...) uses a literal pin number — interpolate from PINS instead`,
    );
  }

  // const int <name> = <n>;  -> must be an allowed pin, and unique per file
  const declared = new Map();
  for (const m of src.matchAll(/const int (\w+)\s*=\s*(\d+)\s*;/g)) {
    const [, name, numStr] = m;
    const num = Number(numStr);
    if (!allowed.has(num)) {
      fail.push(
        `${file}: "const int ${name} = ${num}" is not a pin in pins.ts (allowed: ${[...allowed].sort((a, b) => a - b).join(", ")})`,
      );
    }
    if (declared.has(num)) {
      fail.push(
        `${file}: pin ${num} used twice in one sketch — ${declared.get(num)} and ${name}`,
      );
    }
    declared.set(num, name);
  }
}

// --- report ---
for (const w of warn) console.warn(`  warn  ${w}`);
for (const f of fail) console.error(`  FAIL  ${f}`);

if (fail.length) {
  console.error(`\ncheck-pins: ${fail.length} problem(s) found.\n`);
  process.exit(1);
}
console.log(
  `check-pins: ok — ${seenIds.size} snippets, pins ${[...allowed].sort((a, b) => a - b).join(", ")}${warn.length ? `, ${warn.length} warning(s)` : ""}`,
);
