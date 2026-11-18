import assert from "node:assert/strict";
import runInstructions from "../../../src/index.js";
import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

const findAll = (node, predicate, output = []) => {
    if (!node || typeof node !== "object") return output;
    if (predicate(node)) output.push(node);
    for (const child of node.children ?? []) findAll(child, predicate, output);
    return output;
};

const build = options => runInstructions({
    instructionMainKey: "table",
    instructionSubKey: "simple",
    data: { columns, data },
    options
});

const all = build({
    search: { showLabel: true, showHelper: true, showInput: true },
    serial: { showRootSerial: true, showSubSerial: true },
    options: { showButton: true, showEditButton: true, showDeleteButton: true }
});

assert.equal(findAll(all, n => n.attributes?.["data-role"] === "search-toolbar").length, 1);
assert.equal(findAll(all, n => n.attributes?.id === "table-title").length, 1);
assert.equal(findAll(all, n => n.attributes?.id === "search-feedback").length, 1);
assert.equal(findAll(all, n => n.attributes?.id === "tableSearch").length, 1);
const header = findAll(all, n => n.attributes?.["data-role"] === "table-header-row")[0];
const body = findAll(all, n => n.attributes?.["data-role"] === "table-body")[0];
assert.equal(header.children.length, 7);
assert.equal(body.children[0].children.length, 7);

const inputOnly = build({ search: { showInput: true } });
assert.equal(findAll(inputOnly, n => n.attributes?.id === "tableSearch").length, 1);
assert.equal(findAll(inputOnly, n => n.attributes?.id === "table-title").length, 0);
assert.equal(findAll(inputOnly, n => n.attributes?.id === "search-feedback").length, 0);

const none = build({
    search: { showLabel: false, showHelper: false, showInput: false },
    serial: { showRootSerial: false, showSubSerial: false },
    options: { showButton: false, showEditButton: false, showDeleteButton: false }
});
assert.equal(findAll(none, n => n.attributes?.["data-role"] === "search-toolbar").length, 0);
assert.equal(findAll(none, n => n.attributes?.id === "tableSearch").length, 0);

console.log("PASS: table.simple option switches execute independently and compose correctly");
