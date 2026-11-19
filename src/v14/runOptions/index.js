import { executeStep } from "json-renderers-run-instructions-steps";

const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);

const getFeatureOptions = (options, featureKey) => {
    if (!isObject(options)) return null;
    if (options[featureKey] !== undefined) return options[featureKey];
    const prefixed = `show${featureKey.charAt(0).toUpperCase()}${featureKey.slice(1)}`;
    if (options[prefixed] !== undefined) return options[prefixed];
    return null;
};

/**
 * Task 2: Applies key-value feature options (search, serial, actions) to base with data.
 */
const runOptions = ({
    options = {},
    optionDefs = {},
    base,
    data,
    showLog = false
} = {}) => {
    if (!base || !isObject(options) || !isObject(optionDefs)) {
        return base;
    }

    for (const [featureKey, featureSwitches] of Object.entries(optionDefs)) {
        if (!isObject(featureSwitches)) continue;

        const userFeature = getFeatureOptions(options, featureKey);
        if (!userFeature) continue;

        const isBool = typeof userFeature === "boolean" && userFeature === true;
        const isObj = isObject(userFeature);
        if (!isBool && !isObj) continue;

        const hasActiveSwitch = Object.entries(featureSwitches).some(
            ([switchKey]) => switchKey !== "initialize" && (isBool || userFeature[switchKey] === true)
        );
        if (!hasActiveSwitch) continue;

        // 1. Run initialize instruction if present (e.g. "searchFrame")
        if (featureSwitches.initialize) {
            executeStep(featureSwitches.initialize, { base, data }, showLog);
        }

        // 2. Run enabled switch instructions (e.g. "searchLabel", "searchInput")
        for (const [switchKey, instructionKey] of Object.entries(featureSwitches)) {
            if (switchKey === "initialize") continue;

            const isEnabled = isBool || userFeature[switchKey] === true;
            if (isEnabled) {
                executeStep(instructionKey, { base, data }, showLog);
            }
        }
    }

    return base;
};

export default runOptions;
