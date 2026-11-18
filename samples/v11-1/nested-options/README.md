# V10 Nested Options — Browser UI sample

This is a separate V10 copy of the existing `samples/v8/test` UI. The V8 sample is unchanged.

## Generate the V10 JSON specification

From the `json-renderers-run-instructions` repository root:

```bash
node samples/v10/nested-options/generate.mjs
```

This runs the V10 instruction pipeline using the nested options contract in the sibling `spec-repo` and writes `generated-spec.json` beside this sample.

## Open the UI

Serve the repository over HTTP (do not open `index.html` using `file://`). For example, use the VS Code Live Server extension and open:

`samples/v10/nested-options/index.html`

The page uses the same `@keshavsoft/json-to-dom` browser script URL as the original V8 sample and renders `generated-spec.json` into `#dom-render-container`.

Regenerate the JSON whenever `columns.json`, `data.json`, the options sample, or the V10 instructions change.
