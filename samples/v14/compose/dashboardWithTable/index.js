import dashboardData from "./data.json" with { type: "json" };
import runInstruction from "../../../../docs/dist/v11/min.js";

const start = () => {
    try {
        // 1. Build KPI Cards via menu.cards
        const cardsSpec = runInstruction({
            instructionMainKey: "menu",
            instructionSubKey: "cards",
            data: { items: dashboardData.kpiCards }
        });

        // 2. Build Invoices Table via table.simple
        const tableSpec = runInstruction({
            instructionMainKey: "table",
            instructionSubKey: "simple",
            data: {
                columns: dashboardData.tableColumns,
                data: dashboardData.tableData
            },
            options: {
                search: {
                    showLabel: true,
                    showHelper: true,
                    showInput: true
                },
                serial: true,
                options: {
                    showButton: true,
                    showEditButton: true,
                    showDeleteButton: true
                }
            }
        });

        // Render KPI Cards into top slot
        window.ks.jsonToDom.appendToDom({
            jsonSpec: cardsSpec,
            targetHtmlId: "kpi-cards-slot",
            document
        });

        // Render Table into bottom slot
        window.ks.jsonToDom.appendToDom({
            jsonSpec: tableSpec,
            targetHtmlId: "invoices-table-slot",
            document
        });

        console.log("Composed Dashboard with KPI Cards & Table rendered successfully!");
    } catch (err) {
        console.error("Error in compose/dashboardWithTable:", err);
    }
};

window.addEventListener("DOMContentLoaded", start);
