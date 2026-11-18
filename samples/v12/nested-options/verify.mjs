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

const build = (options, instructionSubKey = "simple") => runInstructions({
    instructionMainKey: "table",
    instructionSubKey,
    data: { columns, data },
    options
});

const allFeatures = build({
    search: { showLabel: true, showHelper: true, showInput: true },
    serial: { showRootSerial: true, showSubSerial: true },
    options: { showButton: true, showEditButton: true, showDeleteButton: true }
});

assert.equal(findAll(allFeatures, n => n.attributes?.["data-role"] === "search-toolbar").length, 1);
assert.equal(findAll(allFeatures, n => n.attributes?.id === "table-title").length, 1);
assert.equal(findAll(allFeatures, n => n.attributes?.id === "search-feedback").length, 1);
assert.equal(findAll(allFeatures, n => n.attributes?.id === "tableSearch").length, 1);
const allHeader = findAll(allFeatures, n => n.attributes?.["data-role"] === "table-header-row")[0];
const allBody = findAll(allFeatures, n => n.attributes?.["data-role"] === "table-body")[0];
assert.equal(allHeader.children.length, 7);
assert.equal(allBody.children[0].children.length, 7);

const inputOnly = build({
    search: { showLabel: false, showHelper: false, showInput: true },
    serial: { showRootSerial: false, showSubSerial: false },
    options: { showButton: false, showEditButton: false, showDeleteButton: false }
});
assert.equal(findAll(inputOnly, n => n.attributes?.["data-role"] === "search-toolbar").length, 1);
assert.equal(findAll(inputOnly, n => n.attributes?.id === "table-title").length, 0);
assert.equal(findAll(inputOnly, n => n.attributes?.id === "search-feedback").length, 0);
assert.equal(findAll(inputOnly, n => n.attributes?.id === "tableSearch").length, 1);

const none = build({
    search: { showLabel: false, showHelper: false, showInput: false },
    serial: { showRootSerial: false, showSubSerial: false },
    options: { showButton: false, showEditButton: false, showDeleteButton: false }
});
assert.equal(findAll(none, n => n.attributes?.["data-role"] === "search-toolbar").length, 0);
assert.equal(findAll(none, n => n.attributes?.id === "tableSearch").length, 0);

const existingSearchBase = build({
    search: { showLabel: true, showHelper: true, showInput: true }
}, "withSearch");
assert.equal(findAll(existingSearchBase, n => n.attributes?.["data-role"] === "search-toolbar").length, 1);
assert.equal(findAll(existingSearchBase, n => n.attributes?.id === "tableSearch").length, 1);


const footerTable = build({
    search: { showLabel: true, showHelper: false, showInput: true },
    serial: { showRootSerial: true, showSubSerial: true },
    options: { showButton: true, showEditButton: true, showDeleteButton: true }
}, "withFooter");
assert.equal(findAll(footerTable, n => n.attributes?.["data-role"] === "search-toolbar").length, 1);
assert.equal(findAll(footerTable, n => n.attributes?.id === "tableSearch").length, 1);
const footerHeader = findAll(footerTable, n => n.attributes?.["data-role"] === "table-header-row")[0];
const footerBody = findAll(footerTable, n => n.attributes?.["data-role"] === "table-body")[0];
const footerRow = findAll(footerTable, n => n.attributes?.["data-role"] === "table-footer-row")[0];
assert.equal(footerHeader.children.length, 7);
assert.equal(footerBody.children[0].children.length, 7);
assert.equal(footerRow.children.length, 7);


const searchFooterTable = build({
    search: { showLabel: true, showHelper: true, showInput: true },
    serial: { showRootSerial: false, showSubSerial: false },
    options: { showButton: false, showEditButton: false, showDeleteButton: false }
}, "withSearchAndFooter");
assert.equal(findAll(searchFooterTable, n => n.attributes?.["data-role"] === "search-toolbar").length, 1);
assert.equal(findAll(searchFooterTable, n => n.attributes?.id === "tableSearch").length, 1);

console.log("PASS: nested option contract, independent switches, feature composition, and duplicate search prevention");
