import test from "node:test";
import assert from "node:assert/strict";
import runInstructionsV11 from "../src/v11/index.js";
import runInstructionsV12 from "../src/v12/index.js";
import runInstructionsV13 from "../src/v14/index.js";

const columns = [
    { columnName: "itemName", label: "Item Name", type: "text", width: "260px" },
    { columnName: "category", label: "Category", type: "select", width: "180px", options: ["Fasteners", "Raw Materials", "Extrusions"] },
    { columnName: "baseUnit", label: "Base Unit", type: "text", width: "120px" }
];

const data = [
    { itemName: "M6 Hex Bolt", category: "Fasteners", baseUnit: "pcs" },
    { itemName: "Alloy Sheet 2mm", category: "Raw Materials", baseUnit: "sqm" }
];

test("V12 and V13 produce identical output to V11 for table.simple with all options", () => {
    const options = {
        search: { showLabel: true, showHelper: true, showInput: true },
        serial: { showRootSerial: true, showSubSerial: true },
        options: { showButton: true, showEditButton: true, showDeleteButton: true }
    };

    const out11 = runInstructionsV11({
        instructionMainKey: "table",
        instructionSubKey: "simple",
        data: { columns, data },
        options
    });

    const out12 = runInstructionsV12({
        instructionMainKey: "table",
        instructionSubKey: "simple",
        data: { columns, data },
        options
    });

    const out13 = runInstructionsV13({
        instructionMainKey: "table",
        instructionSubKey: "simple",
        data: { columns, data },
        options
    });

    assert.deepEqual(out12, out11);
    assert.deepEqual(out13, out11);
});

test("V12 and V13 produce identical output to V11 for table.headerOnly", () => {
    const out11 = runInstructionsV11({
        instructionMainKey: "table",
        instructionSubKey: "headerOnly",
        data: { columns, data }
    });

    const out12 = runInstructionsV12({
        instructionMainKey: "table",
        instructionSubKey: "headerOnly",
        data: { columns, data }
    });

    const out13 = runInstructionsV13({
        instructionMainKey: "table",
        instructionSubKey: "headerOnly",
        data: { columns, data }
    });

    assert.deepEqual(out12, out11);
    assert.deepEqual(out13, out11);
});

test("V12 and V13 produce identical output to V11 for table.withFooter", () => {
    const out11 = runInstructionsV11({
        instructionMainKey: "table",
        instructionSubKey: "withFooter",
        data: { columns, data }
    });

    const out12 = runInstructionsV12({
        instructionMainKey: "table",
        instructionSubKey: "withFooter",
        data: { columns, data }
    });

    const out13 = runInstructionsV13({
        instructionMainKey: "table",
        instructionSubKey: "withFooter",
        data: { columns, data }
    });

    assert.deepEqual(out12, out11);
    assert.deepEqual(out13, out11);
});

test("V12 and V13 produce identical output to V11 for table.bodyOnly", () => {
    const out11 = runInstructionsV11({
        instructionMainKey: "table",
        instructionSubKey: "bodyOnly",
        data: { columns, data }
    });

    const out12 = runInstructionsV12({
        instructionMainKey: "table",
        instructionSubKey: "bodyOnly",
        data: { columns, data }
    });

    const out13 = runInstructionsV13({
        instructionMainKey: "table",
        instructionSubKey: "bodyOnly",
        data: { columns, data }
    });

    assert.deepEqual(out12, out11);
    assert.deepEqual(out13, out11);
});

test("V12 and V13 produce identical output to V11 for select.simple (columnOnRow)", () => {
    const out11 = runInstructionsV11({
        instructionMainKey: "select",
        instructionSubKey: "simple",
        data: { columns }
    });

    const out12 = runInstructionsV12({
        instructionMainKey: "select",
        instructionSubKey: "simple",
        data: { columns }
    });

    const out13 = runInstructionsV13({
        instructionMainKey: "select",
        instructionSubKey: "simple",
        data: { columns }
    });

    assert.deepEqual(out12, out11);
    assert.deepEqual(out13, out11);
});

test("V12 and V13 produce identical output to V11 for dataList.simple (columnOnRow)", () => {
    const out11 = runInstructionsV11({
        instructionMainKey: "dataList",
        instructionSubKey: "simple",
        data: { columns, data }
    });

    const out12 = runInstructionsV12({
        instructionMainKey: "dataList",
        instructionSubKey: "simple",
        data: { columns, data }
    });

    const out13 = runInstructionsV13({
        instructionMainKey: "dataList",
        instructionSubKey: "simple",
        data: { columns, data }
    });

    assert.deepEqual(out12, out11);
    assert.deepEqual(out13, out11);
});

test("V12 and V13 produce identical output to V11 for form.simple", () => {
    const out11 = runInstructionsV11({
        instructionMainKey: "form",
        instructionSubKey: "simple",
        data: { columns }
    });

    const out12 = runInstructionsV12({
        instructionMainKey: "form",
        instructionSubKey: "simple",
        data: { columns }
    });

    const out13 = runInstructionsV13({
        instructionMainKey: "form",
        instructionSubKey: "simple",
        data: { columns }
    });

    assert.deepEqual(out12, out11);
    assert.deepEqual(out13, out11);
});

test("V12 and V13 produce identical output to V11 for accordion.simple", () => {
    const items = [
        { title: "Section 1", content: "Content 1" },
        { title: "Section 2", content: "Content 2" }
    ];

    const out11 = runInstructionsV11({
        instructionMainKey: "accordion",
        instructionSubKey: "simple",
        data: { items }
    });

    const out12 = runInstructionsV12({
        instructionMainKey: "accordion",
        instructionSubKey: "simple",
        data: { items }
    });

    const out13 = runInstructionsV13({
        instructionMainKey: "accordion",
        instructionSubKey: "simple",
        data: { items }
    });

    assert.deepEqual(out12, out11);
    assert.deepEqual(out13, out11);
});

test("V12 and V13 produce identical output to V11 for card.simple", () => {
    const cardData = {
        header: "Card Title",
        body: "Card Content",
        footer: "Card Footer"
    };

    const out11 = runInstructionsV11({
        instructionMainKey: "card",
        instructionSubKey: "simple",
        data: cardData
    });

    const out12 = runInstructionsV12({
        instructionMainKey: "card",
        instructionSubKey: "simple",
        data: cardData
    });

    const out13 = runInstructionsV13({
        instructionMainKey: "card",
        instructionSubKey: "simple",
        data: cardData
    });

    assert.deepEqual(out12, out11);
    assert.deepEqual(out13, out11);
});
