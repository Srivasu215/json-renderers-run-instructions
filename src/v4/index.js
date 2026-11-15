import runSingleInstructions from "json-instruction-single";
import runDoubleInstructions from "json-instruction-double";
import rowOnColumnFunc from "json-transformer-funcs-row-on-column";
import columnOnRowFunc from "json-transformer-funcs-column-on-row";
import writePath from "json-write-path";

const runRowOnColumnInstructions = ({ instructions = [], registry = {}, showLog = false } = {}) => {
    const localSpec = registry?.spec;
    const columns = registry?.data?.columns;
    const data = registry?.data?.data;

    instructions.forEach(instruction => {
        const columnSpec = localSpec ? localSpec[instruction?.templateKey?.columnKey] : undefined;
        const rowSpec = localSpec ? localSpec[instruction?.templateKey?.rowKey] : undefined;

        const result = rowOnColumnFunc({
            columns,
            data,
            columnSpec,
            rowSpec
        });

        if (showLog) console.log("[runInstructions:rowOnColumn]", instruction.narration, result);
        writePath(registry, instruction.destinationPath, result);
    });
};

const runColumnOnRowInstructions = ({ instructions = [], registry = {}, showLog = false } = {}) => {
    const localSpec = registry?.spec;
    const columns = registry?.data?.columns;
    const data = registry?.data?.data;

    instructions.forEach(instruction => {
        const columnSpec = localSpec ? localSpec[instruction?.templateKey?.columnKey] : undefined;
        const rowSpec = localSpec ? localSpec[instruction?.templateKey?.rowKey] : undefined;

        const result = columnOnRowFunc({
            columns,
            data,
            columnSpec,
            rowSpec
        });

        if (showLog) console.log("[runInstructions:columnOnRow]", instruction.narration, result);
        writePath(registry, instruction.destinationPath, result);
    });
};

export const runInstructions = ({
    single = [],
    double = [],
    rowOnColumn = [],
    columnOnRow = [],
    registry = {},
    showLog = false
} = {}) => {
    if (showLog) console.log("runInstructions input:", { single, double, rowOnColumn, columnOnRow });

    if (!Array.isArray(single)) throw new TypeError("single instructions must be an array");
    if (!Array.isArray(double)) throw new TypeError("double instructions must be an array");
    if (!Array.isArray(rowOnColumn)) throw new TypeError("rowOnColumn instructions must be an array");
    if (!Array.isArray(columnOnRow)) throw new TypeError("columnOnRow instructions must be an array");
    if (!registry || typeof registry !== "object" || Array.isArray(registry)) {
        throw new TypeError("registry must be an object");
    }

    if (single.length > 0) {
        runSingleInstructions(single, registry, showLog);
    }

    if (double.length > 0) {
        runDoubleInstructions({
            instructions: double,
            registry,
            showLog
        });
    }

    if (rowOnColumn.length > 0) {
        runRowOnColumnInstructions({
            instructions: rowOnColumn,
            registry,
            showLog
        });
    }

    if (columnOnRow.length > 0) {
        runColumnOnRowInstructions({
            instructions: columnOnRow,
            registry,
            showLog
        });
    }

    return registry;
};

export default runInstructions;

