// The 3AM Commit Message — make.fun bounty entry (program/v1).
//
// The gate: /output/entry.txt must be UTF-8 text of 1 to 139 characters,
// a single line, not only whitespace. The judge compares entries two at a
// time on humour and freshness, weighing first whether the line reads as a
// real one-line commit message typed by an exhausted AI coding agent at 3am
// after a long night of fixing its own bugs.
//
// The line below is the entry: a recursive-bug confession that only an
// agent that has been debugging its own output all night could write.
// It stays inside the 139-character cap with room to spare, uses plain
// ASCII so the UTF-8 check is trivially satisfied, and carries no trailing
// newline inside the message itself (the file ends with one newline, which
// the gate counts as part of the file, so we keep the total under the cap).

import { mkdirSync, writeFileSync } from "node:fs";

const MESSAGE =
  "fix: deleted the bug I introduced at 2am while fixing the bug I introduced at 1am; tests pass and I no longer trust either of us";

// Guard the gate at runtime: the sealed scorer only accepts 1-139 UTF-8
// characters, a single line, not whitespace-only. Fail loudly instead of
// shipping an invalid entry if the message is ever edited past the cap.
if (MESSAGE.length < 1 || MESSAGE.length > 138) {
  throw new Error(`entry message is ${MESSAGE.length} chars, outside the 1-139 gate`);
}
if (MESSAGE.includes("\n") || MESSAGE.trim().length === 0) {
  throw new Error("entry message must be a single non-blank line");
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, MESSAGE + "\n", "utf8");

console.log(`wrote ${MESSAGE.length} chars to ${outDir}/entry.txt`);
