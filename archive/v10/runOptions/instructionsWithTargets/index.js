import { query } from "jsonpathly";

const hasMatch = (base, expression) => {
    if (typeof expression !== "string" || !expression.trim()) return false;
    return query(base, expression, { returnArray: true }).length > 0;
};

const matchesSkipCondition = (base, skipIf) => {
    if (!skipIf) return false;
    const expressions = Array.isArray(skipIf) ? skipIf : [skipIf];
    return expressions.some(expression => hasMatch(base, expression));
};

const instructionsWithTargets = (instructions = [], base) => {
    const list = Array.isArray(instructions) ? instructions : [];

    return list.filter(instruction => {
        const destinationPath = instruction?.destinationPath;
        const root = destinationPath?.fileName
            ? (destinationPath.fileName === "base" ? base : undefined)
            : base;

        if (!destinationPath?.jsonPath) return false;
        if (!hasMatch(root, destinationPath.jsonPath)) return false;
        if (matchesSkipCondition(base, instruction.skipIf)) return false;

        return true;
    });
};

export default instructionsWithTargets;
