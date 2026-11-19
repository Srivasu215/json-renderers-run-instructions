import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("v1 exposes the generic instruction and DOM adapter functions", () => {
    const filePath = fs.existsSync(new URL("../src/v1/index.js", import.meta.url))
        ? new URL("../src/v1/index.js", import.meta.url)
        : new URL("../archive/v1/index.js", import.meta.url);
    const source = fs.readFileSync(filePath, "utf8");
    assert.match(source, /export const runInstructions/);
    assert.match(source, /export const renderJsonToDom/);
    assert.doesNotMatch(source, /from ["']spec-repo["']/);
});
