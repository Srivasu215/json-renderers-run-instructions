import { instructions as defaultInstructions } from "spec-repo";
import runSingleInstructions from "json-instruction-single";
import instructionsWithTargets from "./instructionsWithTargets/index.js";

const getInstructionList = (optDef, instructions = defaultInstructions) => {
    if (!optDef) return [];
    if (Array.isArray(optDef)) return optDef;
    if (typeof optDef === "string") return instructions[optDef] ?? [];
    return [];
};

export const runOptions = ({
    base,
    options = {},
    optionDefs = {},
    instructions = defaultInstructions,
    showLog = false
} = {}) => {
    if (!base) return base;
    const context = { base };

    if (options.showSearch && optionDefs.search) {
        const list = getInstructionList(optionDefs.search, instructions);
        const targets = instructionsWithTargets(list, base);
        if (showLog) console.log("[runOptions:search]", targets);
        runSingleInstructions(targets, context, showLog);
    }
    if ((options.showSerial || options.serial) && optionDefs.serial) {
        const list = getInstructionList(optionDefs.serial, instructions);
        const targets = instructionsWithTargets(list, base);
        if (showLog) console.log("[runOptions:serial]", targets);
        runSingleInstructions(targets, context, showLog);
    }
    if ((options.showOptions || options.options) && optionDefs.options) {
        const list = getInstructionList(optionDefs.options, instructions);
        const targets = instructionsWithTargets(list, base);
        if (showLog) console.log("[runOptions:options]", targets);
        runSingleInstructions(targets, context, showLog);
    }
    return base;
};

export default runOptions;