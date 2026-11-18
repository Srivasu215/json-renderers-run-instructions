import { paths } from "jsonpathly";

const startFunc = ({ inSpec, inBase }) => {
    const spec = inSpec;
    const newElement = spec?.tableSearchBar;

    const matchedPaths = paths(inBase, '$..[?@.tagName == "table"]');

    if (matchedPaths.length > 0) {
        // 2. Parse the bracket segments (e.g., ["children", "0"])
        const segments = [...matchedPaths[0].matchAll(/\[(?:'([^']*)'|(\d+))\]/g)].map(
            (m) => (m[1] !== undefined ? m[1] : Number(m[2]))
        );

        // 3. Separate the target index from the parent array path
        const tableIndex = segments.pop();
        const parentArray = segments.reduce((obj, key) => obj[key], inBase);

        // 4. Insert the new element right before the table
        if (Array.isArray(parentArray) && typeof tableIndex === "number") {
            parentArray.splice(tableIndex, 0, newElement);
        };
    };

    return inBase;
};

export default startFunc;