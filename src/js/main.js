import { createChart, clearChart } from "./chart.js";

const updateDataBtn = document.getElementById("updateBtn");
const errorContainer = document.getElementById("errorMessage");
const input = document.getElementById("inputData");
updateDataBtn.addEventListener("click", () => {
    let data = [];
    let inputValues = input.value.split(",");
    let error = false;
    inputValues.forEach((value) => {
        if (isNaN(value) || value === "") {
            errorContainer.innerHTML = "Please enter a valid number";
            error = true;
            return;
        }
        data.push({
            label: value,
            value: parseInt(value)
        });
    });
    if(data.length === 0) {
        errorContainer.innerHTML = "Please enter at least one number";
        error = true;
    }
    if(error) {
        clearChart();
        return;
    }
    errorContainer.innerHTML = "";
    createChart(data);
});