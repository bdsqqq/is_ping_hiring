import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

test("the production build renders the hiring answer", () => {
  execFileSync(process.execPath, ["node_modules/astro/bin/astro.mjs", "build"], {
    stdio: "pipe",
  });

  const page = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");

  assert.match(page, /<title>Is ping\.gg hiring\?\?<\/title>/);
  assert.match(page, /class="answer">No\.<\/p>/);
  assert.match(page, /href="https:\/\/ping\.gg\/"/);
});
