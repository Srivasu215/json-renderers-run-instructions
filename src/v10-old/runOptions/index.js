import { instructions as defaultInstructions, spec as defaultSpec } from "spec-repo";
import runSingleInstructions from "json-instruction-single";
import instructionsWithTargets from "./instructionsWithTargets/index.js";

/*
 * Instruction references may be:
 * - a key in spec-repo.instructions;
 * - an array of instruction references (composable instruction groups);
 * - an inline instruction object;
 * - an array of inline instruction objects.
 */
const resolveInstructionList = (reference, instructions) => {
    if (!reference) return [];

    if (typeof reference === "string") {
        const resolved = instructions[reference];
        return Array.isArray(resolved) ? resolved : resolved ? [resolved] : [];
    }

    if (Array.isArray(reference)) {
        return reference.flatMap(item => resolveInstructionList(item, instructions));
    }

    if (typeof reference === "object") {
        return [reference];
    }

    return [];
};

const runInstructionReference = ({
    reference,
    instructions,
    context,
    showLog
}) => {
    const resolved = resolveInstructionList(reference, instructions);
    const executable = instructionsWithTargets(resolved, context.base);

    if (showLog) {
        console.log("[runOptions]", {
            reference,
            resolvedCount: resolved.length,
            executableCount: executable.length
        });
    }

    if (executable.length > 0) {
        runSingleInstructions(executable, context, showLog);
    }
};

/*
 * The options contract is intentionally generic:
 *
 * options = {
 *   featureName: { switchName: true }
 * }
 *
 * optionDefs mirrors that shape, mapping each switch to instruction references.
 * A feature definition may contain `initialize`, an instruction reference that
 * runs once whenever at least one configured switch is enabled.
 *
 * No feature names or switch names are hardcoded in this runner.
 */
export const runOptions = ({
    base,
    options = {},
    optionDefs = {},
    instructions = defaultInstructions,
    showLog = false
} = {}) => {
    if (!base || !options || typeof options !== "object") return base;

    const context = { base, spec: structuredClone(defaultSpec) };

    for (const [featureName, featureDefinition] of Object.entries(optionDefs ?? {})) {
        const incomingFeature = options[featureName];

        if (!incomingFeature || typeof incomingFeature !== "object" || Array.isArray(incomingFeature)) {
            continue;
        }

        const enabledSwitches = Object.entries(incomingFeature).filter(
            ([switchName, enabled]) =>
                enabled === true &&
                Object.prototype.hasOwnProperty.call(featureDefinition, switchName) &&
                switchName !== "initialize"
        );

        if (enabledSwitches.length === 0) continue;

        // Optional structural preparation, declared by the specification.
        if (featureDefinition.initialize) {
            runInstructionReference({
                reference: featureDefinition.initialize,
                instructions,
                context,
                showLog
            });
        }

        // Each enabled nested boolean maps to its own instruction collection.
        for (const [switchName] of enabledSwitches) {
            runInstructionReference({
                reference: featureDefinition[switchName],
                instructions,
                context,
                showLog
            });
        }
    }

    return base;
};

export default runOptions;
