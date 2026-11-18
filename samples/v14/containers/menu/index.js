import menuData from "./items.json" with { type: "json" };
import runInstruction from "../../../../docs/dist/v11/min.js";

const start = () => {
    try {
        // 1. Simple Navigation Menu
        const specSimple = runInstruction({
            instructionMainKey: "menu",
            instructionSubKey: "simple",
            data: menuData.simple
        });

        window.ks.jsonToDom.appendToDom({
            jsonSpec: specSimple,
            targetHtmlId: "menu-simple-container",
            document
        });

        // 2. Menu Cards Grid
        const specCards = runInstruction({
            instructionMainKey: "menu",
            instructionSubKey: "cards",
            data: menuData.cards
        });

        window.ks.jsonToDom.appendToDom({
            jsonSpec: specCards,
            targetHtmlId: "menu-cards-container",
            document
        });

    } catch (err) {
        console.error("Error rendering menu:", err);
    }
};

window.addEventListener("DOMContentLoaded", start);
