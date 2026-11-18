import rowOnColumnFunc from "json-transformer-funcs-row-on-column";
import fromCollection from "json-transformer-funcs-one-dimension";
import applyTemplate from "json-transformer-funcs-primitive";
import writePath from "json-write-path";
import { query } from "jsonpathly";
import registerGlobal from "./registerGlobal/index.js";

import { spec, instructions, definitions } from "spec-repo";

import runOptions from "./runOptions/index.js";

const transformerFunctions = {
    fromCollection,
    applyTemplate
};

const resolveSource = (sourcePath, context) => {
    if (!sourcePath) return null;

    const root = context[sourcePath.fileName];
    if (root === undefined) {
        throw new Error(`Context entry not found: ${sourcePath.fileName}`);
    }

    if (sourcePath.jsonPath) {
        const matches = query(root, sourcePath.jsonPath, { returnArray: true });
        if (matches.length === 0) {
            if (Array.isArray(root)) return root;
            return [];
        }
        return matches.length === 1 ? matches[0] : matches;
    }

    if (Array.isArray(sourcePath.filePath) && sourcePath.filePath.length > 0) {
        return sourcePath.filePath.reduce((curr, key) => (curr ? curr[key] : undefined), root);
    }

    return root;
};

const checkDestinationExists = (destinationPath, context) => {
    if (!destinationPath) return true;
    const root = context[destinationPath.fileName];
    if (root === undefined) return false;

    if (destinationPath.jsonPath) {
        const matches = query(root, destinationPath.jsonPath, { returnArray: true });
        return matches.length > 0;
    }

    return true;
};

const executeInstruction = ({ instruction, context, spec, showLog = false }) => {
    if (!instruction) return null;

    // Handle array of sub-instructions (e.g. serial, options, search)
    if (Array.isArray(instruction)) {
        return instruction.map(step => executeInstruction({ instruction: step, context, spec, showLog }));
    }

    // Auto-normalize legacy dataRole to jsonPath
    if (instruction.destinationPath?.dataRole && !instruction.destinationPath?.jsonPath) {
        instruction.destinationPath.jsonPath = `$..*[?@.attributes['data-role'] == '${instruction.destinationPath.dataRole}']`;
    }

    // Skip if instruction has skipIf condition and target already exists
    if (instruction.skipIf && query(context.base, instruction.skipIf, { returnArray: true }).length > 0) {
        return null;
    }

    // If destination node does not exist in current base (e.g. footer row on a table without footer), safely skip
    if (!checkDestinationExists(instruction.destinationPath, context)) {
        if (showLog) {
            console.warn(`Destination node not found for ${instruction.destinationPath?.jsonPath}, skipping instruction.`);
        }
        return null;
    }

    const type = instruction.type ?? (instruction.templateKey?.columnKey ? "rowOnColumn" : "single");

    // 1. rowOnColumn instruction (e.g. buildBody for table)
    if (type === "rowOnColumn") {
        const columnKey = instruction?.templateKey?.columnKey;
        const rowKey = instruction?.templateKey?.rowKey;
        const columnSpec = spec[columnKey];
        const rowSpec = spec[rowKey];

        const columns = context.data?.columns ?? context.columns;
        const rows = context.data?.data ?? (Array.isArray(context.data) ? context.data : context.rows);

        const result = rowOnColumnFunc({
            columns,
            data: rows,
            columnSpec,
            rowSpec
        });

        writePath(context, instruction.destinationPath, result, showLog);
        return result;
    }

    // 2. columnOnRow instruction (e.g. buildSelectWithOptions, buildDataListWithOptions)
    if (type === "columnOnRow") {
        const columnKey = instruction?.templateKey?.columnKey;
        const rowKey = instruction?.templateKey?.rowKey;
        const columnSpec = spec[columnKey];
        const rowSpec = spec[rowKey];

        const columns = context.data?.columns ?? context.columns ?? [];
        const rows = context.data?.data ?? (Array.isArray(context.data) ? context.data : context.rows ?? []);

        const result = columns.map(column => {
            const container = applyTemplate(column, columnSpec);

            let optionsList = [];
            if (Array.isArray(column.options) && column.options.length > 0) {
                optionsList = column.options.map(opt =>
                    typeof opt === "object" ? opt : { rowValue: opt }
                );
            } else if (Array.isArray(rows) && rows.length > 0) {
                optionsList = rows.map(r => ({
                    ...r,
                    rowValue: r[column.columnName] ?? r.value ?? r
                }));
            }

            container.children = optionsList.map(item => applyTemplate(item, rowSpec));
            return container;
        });

        if (!instruction.destinationPath?.filePath || instruction.destinationPath.filePath.length === 0) {
            context[instruction.destinationPath.fileName] = result;
        } else {
            writePath(context, instruction.destinationPath, result, showLog);
        }
        return result;
    }

    // 3. single instruction (e.g. buildColgroup, buildHeader, buildFooter, buildFormField, buildOptionsArray)
    const template = instruction.templateKey ? spec[instruction.templateKey] : null;
    const source = resolveSource(instruction.sourcePath, context);

    let result;
    if (instruction.func === null || instruction.func === undefined) {
        result = structuredClone(template);
    } else if (transformerFunctions[instruction.func]) {
        result = transformerFunctions[instruction.func](source, template);
    } else {
        throw new Error(`Unknown function: ${instruction.func}`);
    }

    // If destination filePath is empty (e.g. writing directly into an array base like selectOptionsOnlyBase)
    if (!instruction.destinationPath?.filePath || instruction.destinationPath.filePath.length === 0) {
        if (Array.isArray(context[instruction.destinationPath.fileName])) {
            context[instruction.destinationPath.fileName].push(...(Array.isArray(result) ? result : [result]));
        } else {
            context[instruction.destinationPath.fileName] = result;
        }
    } else {
        writePath(context, instruction.destinationPath, result, showLog);
    }

    return result;
};

const startFunc = ({
    instructionMainKey,
    instructionSubKey,
    data,
    options,
    showLog = false
} = {}) => {
    const definition = definitions[instructionMainKey]?.[instructionSubKey];
    if (!definition) {
        throw new Error(`Definition not found: ${instructionMainKey}.${instructionSubKey}`);
    }

    const baseKey = definition.baseFromSpec;
    const instructionsToRun = definition.instructions ?? [];
    const optionDefs = (definition.options && typeof definition.options === "object")
        ? definition.options
        : (definitions[instructionMainKey]?.options ?? instructions.options?.[definition.options] ?? {});

    const base = structuredClone(spec[baseKey]);

    const context = { base, data };

    instructionsToRun.forEach(instructionKeyOrObj => {
        if (showLog) console.log("instruction : ", instructionKeyOrObj);

        const instruction = typeof instructionKeyOrObj === "string"
            ? instructions[instructionKeyOrObj]
            : instructionKeyOrObj;

        if (!instruction) {
            if (showLog) console.warn(`Instruction not found: ${instructionKeyOrObj}`);
            return;
        }

        executeInstruction({ instruction, context, spec, showLog });
    });

    runOptions({
        base: context?.base,
        options,
        optionDefs,
        instructions,
        spec,
        executeInstruction: ({ instruction }) => executeInstruction({ instruction, context, spec, showLog }),
        showLog
    });

    return context?.base;
};

export default startFunc;

registerGlobal(startFunc);