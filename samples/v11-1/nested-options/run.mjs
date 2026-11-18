import runInstructions from "../../../src/index.js";
import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

const result = runInstructions({
    instructionMainKey: "table",
    instructionSubKey: "simple",
    data: { columns, data },
    options: {
        search: { showLabel: true, showHelper: true, showInput: true },
        serial: { showRootSerial: true, showSubSerial: true },
        options: { showButton: true, showEditButton: true, showDeleteButton: true }
    }
});

const findAll = (node, predicate, output = []) => {
    if (!node || typeof node !== "object") return output;
    if (predicate(node)) output.push(node);
    for (const child of node.children ?? []) findAll(child, predicate, output);
    return output;
};

const header = findAll(result, node => node.attributes?.["data-role"] === "table-header-row")[0];
const body = findAll(result, node => node.attributes?.["data-role"] === "table-body")[0];

console.log({
    searchToolbarCount: findAll(result, node => node.attributes?.["data-role"] === "search-toolbar").length,
    searchInputCount: findAll(result, node => node.attributes?.id === "tableSearch").length,
    headerCellCount: header?.children?.length ?? 0,
    firstRowCellCount: body?.children?.[0]?.children?.length ?? 0
});
