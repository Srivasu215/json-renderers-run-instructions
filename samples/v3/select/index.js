import runInstructions from "../../../src/index.js";

import columns from "./common/columns.json" with { type: "json" };
import data from "./common/data.json" with { type: "json" };
import { definitions, spec } from "../../../node_modules/spec-repo/src/index.js";

const start = () => {
    try {
        const defForSelect = definitions?.select;

        const registry = {
            data: { columns, data },
            base: structuredClone(defForSelect?.base),
            spec
        };

        const result = runInstructions({
            single: defForSelect?.single,
            columnOnRow: defForSelect?.columnOnRow,
            registry,
            showLog: false
        });

        console.log("Select rendered successfully with columnOnRow!");
        console.log("select elements count:", result.base.children.length);
        console.log("first select id:", result.base.children[0].attributes.id);
        console.log("first select options count:", result.base.children[0].children.length);
    } catch (error) {
        console.error("V3 Select initialization failed:", error);
    }
};

start();

