import columns from "./columns.json" with { type: "json" };
import runInstruction from "../../../../../docs/dist/v11/min.js";

const start = () => {
    try {
        const spec = runInstruction({
            instructionMainKey: "table",
            instructionSubKey: "headerOnly",
            data: { columns },
            options: {
                search: {
                    showLabel: true,
                    showHelper: true,
                    showInput: true
                },
                serial: true
            }
        });

        console.log("table.headerOnly spec:", spec);

        window.ks.jsonToDom.appendToDom({
            jsonSpec: spec,
            targetHtmlId: "dom-render-container",
            appendPosition: "append",
            showLog: true
        });
    } catch (err) {
        console.error("Error in table.headerOnly:", err);
    }
};

start();
