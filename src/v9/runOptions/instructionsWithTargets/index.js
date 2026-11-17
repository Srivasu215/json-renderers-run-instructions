import { query } from "jsonpathly";

const instructionsWithTargets = (instructions = [], base) => {
    const list = Array.isArray(instructions) ? instructions : [];
    return list.filter(({ destinationPath }) => {
        const jsonPath = destinationPath?.jsonPath;
        if (typeof jsonPath !== "string" || !jsonPath.trim()) return false;
        return query(base, jsonPath, { returnArray: true }).length > 0;
    });
};

export default instructionsWithTargets;