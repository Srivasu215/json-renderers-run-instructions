import { instructions as defaultInstructions, spec as defaultSpec } from "spec-repo";
import runSingleInstructions from "json-instruction-single";
import instructionsWithTargets from "./instructionsWithTargets/index.js";

const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);

const resolve = (reference, library) => {
    if (Array.isArray(reference)) return reference.flatMap(item => resolve(item, library));
    if (typeof reference === "string") return resolve(library[reference], library);
    if (isObject(reference)) return [reference];
    return [];
};

const execute = (reference, context, library, showLog) => {
    const resolved = resolve(reference, library);
    const ready = instructionsWithTargets(resolved, context.base);

    if (showLog) console.log("[runOptions]", { reference, resolved: resolved.length, ready: ready.length });
    if (ready.length) runSingleInstructions(ready, context, showLog);
};

const getSelected = (options, feature) => {
    if (!isObject(options)) return null;
    if (options[feature] !== undefined) return options[feature];
    const prefixed = `show${feature.charAt(0).toUpperCase()}${feature.slice(1)}`;
    if (options[prefixed] !== undefined) return options[prefixed];
    return null;
};

/** Apply the enabled option switches defined by spec-repo. */
const runOptions = ({
    base,
    options = {},
    optionDefs = {},
    instructions = defaultInstructions,
    spec = defaultSpec,
    showLog = false
} = {}) => {
    if (!base || !isObject(options)) return base;

    const context = { base, spec: structuredClone(spec) };

    for (const [feature, switches] of Object.entries(optionDefs)) {
        if (!isObject(switches)) continue;

        const selected = getSelected(options, feature);
        if (!selected) continue;

        const isBool = typeof selected === "boolean" && selected === true;
        const isObj = isObject(selected);
        if (!isBool && !isObj) continue;

        const enabled = Object.entries(switches)
            .filter(([name]) => name !== "initialize" && (isBool || selected[name] === true));

        if (!enabled.length) continue;

        if (switches.initialize) {
            execute(switches.initialize, context, instructions, showLog);
        }

        for (const [, instructionRef] of enabled) {
            execute(instructionRef, context, instructions, showLog);
        }
    }

    return base;
};

export { runOptions };
export default runOptions;
