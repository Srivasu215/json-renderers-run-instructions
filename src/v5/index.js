import runSingleInstructions from "json-instruction-single";
import runDoubleInstructions from "json-instruction-double";
import rowOnColumnFunc from "json-transformer-funcs-row-on-column";
import columnOnRowFunc from "json-transformer-funcs-column-on-row";
import writePath from "json-write-path";
import spec from "spec-repo";

const runRowOnColumnInstructions = ({ instructions = [], base, data, showLog = false } = {}) => {
    instructions.forEach(instruction => {
        const columnSpec = spec[instruction?.templateKey?.columnKey];
        const rowSpec = spec[instruction?.templateKey?.rowKey];

        const result = rowOnColumnFunc({
            columns: data?.columns,
            data: data?.data,
            columnSpec,
            rowSpec
        });

        if (showLog) console.log("[runInstructions:rowOnColumn]", instruction.narration, result);
        writePath({ base, data }, instruction.destinationPath, result);
    });
};

const runColumnOnRowInstructions = ({ instructions = [], base, data, showLog = false } = {}) => {
    instructions.forEach(instruction => {
        const columnSpec = spec[instruction?.templateKey?.columnKey];
        const rowSpec = spec[instruction?.templateKey?.rowKey];

        const result = columnOnRowFunc({
            columns: data?.columns,
            data: data?.data,
            columnSpec,
            rowSpec
        });

        if (showLog) console.log("[runInstructions:columnOnRow]", instruction.narration, result);
        writePath({ base, data }, instruction.destinationPath, result);
    });
};

export const runInstructions = ({
    single = [],
    double = [],
    rowOnColumn = [],
    columnOnRow = [],
    base,
    data,
    showLog = false
} = {}) => {
    if (showLog) console.log("runInstructions input:", { single, double, rowOnColumn, columnOnRow, base, data });

    if (!Array.isArray(single)) throw new TypeError("single instructions must be an array");
    if (!Array.isArray(double)) throw new TypeError("double instructions must be an array");
    if (!Array.isArray(rowOnColumn)) throw new TypeError("rowOnColumn instructions must be an array");
    if (!Array.isArray(columnOnRow)) throw new TypeError("columnOnRow instructions must be an array");

    const context = { base, data };

    if (single.length > 0) runSingleInstructions(single, context, showLog);
    if (double.length > 0) runDoubleInstructions({ instructions: double, registry: context, showLog });
    if (rowOnColumn.length > 0) runRowOnColumnInstructions({ instructions: rowOnColumn, base, data, showLog });
    if (columnOnRow.length > 0) runColumnOnRowInstructions({ instructions: columnOnRow, base, data, showLog });

    return context;
};

export default runInstructions;
