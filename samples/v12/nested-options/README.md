# V11 Nested Options — Browser UI sample

This is the browser sample copied forward from the existing V8 UI. The original V8 sample remains unchanged.

## Generate the JSON specification

Run from the `json-renderers-run-instructions` repository root:

```bash
node samples/v11/nested-options/generate.mjs
```

The script runs the active instruction pipeline with the nested-options contract from the sibling `spec-repo` and writes `generated-spec.json` beside this sample.

## Open the UI

Serve the repository over HTTP (do not open the page using `file://`). For example, use VS Code Live Server and open `samples/v11/nested-options/index.html`. The page renders `generated-spec.json` into `#dom-render-container` using the same JSON-to-DOM browser integration as the original V8 sample.

Regenerate the JSON after changing the columns, data, options, templates, or instructions.
