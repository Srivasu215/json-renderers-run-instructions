import { writeFile } from "node:fs/promises";
// import runInstructions from "../../../src/index.js";
import columns from "./columns.json" with { type: "json" };
import data from "./data.json" with { type: "json" };
import options from "../../../../spec-repo/src/v18/samples/nested-options/options.json" with { type: "json" };

import runInstructions from "../../../docs/dist/v10/min.js";

const result = runInstructions({
    instructionMainKey: "table",
    instructionSubKey: "simple",
    data: { columns, data },
    options
});

await writeFile(new URL("./generated-spec.json", import.meta.url), `${JSON.stringify(result, null, 4)}\n`);
console.log("Generated samples/v11/nested-options/generated-spec.json");
