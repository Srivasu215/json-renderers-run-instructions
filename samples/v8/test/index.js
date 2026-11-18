import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };

import runInstruction from "../../../docs/dist/v9/min.js";

const start = () => {
    try {
        // 1. Build form fields JSON AST using the unified runner
        const formSpec = runInstruction({
            instructionMainKey: "table",
            instructionSubKey: "simple",
            data: { columns, data },
            options: {
                showSearch: true
            }
        });

        console.log("Form JSON spec built successfully:", formSpec);

        // 2. Render into HTML DOM via json-to-dom
        window.ks.jsonToDom.appendToDom({
            jsonSpec: formSpec,
            targetHtmlId: "dom-render-container",
            appendPosition: "append",
            showLog: true
        });

        console.log("Form Simple rendered into DOM successfully!");
    } catch (err) {
        console.error("Error building or rendering Form Simple:", err);
    }
};

start();