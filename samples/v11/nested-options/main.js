import generatedSpec from "./generated-spec.json" with { type: "json" };

const render = () => {
    const renderer = window.ks?.jsonToDom;

    if (!renderer?.appendToDom) {
        console.error("@keshavsoft/json-to-dom did not initialize. Check the renderer script in index.html.");
        return;
    }

    renderer.appendToDom({
        jsonSpec: generatedSpec,
        targetHtmlId: "dom-render-container",
        appendPosition: "append",
        showLog: true
    });

    console.log("V10 nested-options UI rendered successfully.");
};

if (window.ks?.jsonToDom) {
    render();
} else {
    window.addEventListener("load", render, { once: true });
}
