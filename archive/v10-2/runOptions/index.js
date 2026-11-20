import { instructions as defaultInstructions, spec as defaultSpec } from "spec-repo";
import runSingleInstructions from "json-instruction-single";
import instructionsWithTargets from "./instructionsWithTargets/index.js";

const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);

const resolve = (reference, library) => {
    if (Array.isArray(reference)) return reference.flatMap(item => resolve(item, library));
    if (typeof reference === "string") return resolve(library[reference], library);
    return [];
};

const execute = (reference, context, library, showLog) => {
    const resolved = resolve(reference, library);
    const ready = instructionsWithTargets(resolved, context.base);

    if (showLog) console.log("[runOptions]", { resolved: resolved.length, ready: ready.length });
    if (ready.length) runSingleInstructions(ready, context, showLog);
};

/** Apply the enabled option switches defined by spec-repo. */
const runOptions = ({
    base,
    options = {},
    optionDefs = {},
    instructions = defaultInstructions,
    showLog = false
} = {}) => {
    if (!base || !isObject(options)) return base;

    const context = { base, spec: structuredClone(defaultSpec) };

    for (const [feature, switches] of Object.entries(optionDefs)) {
        const selected = options[feature];
        if (!isObject(selected) || !isObject(switches)) continue;

        const enabled = Object.entries(selected)
            .filter(([name, value]) => value === true && name !== "initialize" && switches[name]);

        if (!enabled.length) continue;

        if (switches.initialize) execute(switches.initialize, context, instructions, showLog);
        for (const [name] of enabled) {
            execute(switches[name], context, instructions, showLog);
        }
    }

    return base;
};

export { runOptions };
export default runOptions;
