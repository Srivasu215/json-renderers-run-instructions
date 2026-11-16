import runInstructions from "../../../src/index.js";

import columns from "./common/columns.json" with { type: "json" };
import data from "./common/data.json" with { type: "json" };
import { definitions, spec } from "spec-repo";

const start = () => {
    try {
        const def = definitions?.table?.simple;
        const localBase = structuredClone(def?.base);
        console.log("col group : ", localBase.children[0].children[0].children);
        console.log("head : ", localBase.children[0].children[1].children[0].children);
        console.log("body : ", localBase.children[0].children[2].children);

        runInstructions({
            single: def?.single,
            rowOnColumn: def?.rowOnColumn,
            data: { columns, data },
            base: localBase,
            showLog: false
        });

        console.log("Table rendered successfully with rowOnColumn!");

        console.log("col group : ", localBase.children[0].children[0].children);
        console.log("end : ", localBase.children[0].children[1].children[0].children);
        console.log("body : ", localBase.children[0].children[2].children);

        // console.log("base : ", result?.base?.children[0].children);

        // console.log("tbody rows count:", result.base.children[0].children[2].children.length);
        // console.log("first row cells:", result.base.children[0].children[2].children[0].children.length);
    } catch (error) {
        console.error("V3 Table initialization failed:", error);
    }
};

start();

