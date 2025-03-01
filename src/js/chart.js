import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function createChart(data) {
    const width = 500, height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    d3.select("#chart").selectAll("*").remove();

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([margin.top, height - margin.bottom])
        .padding(0.4);

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => y(d.label))
        .attr("x", margin.left)
        .attr("width", d => x(d.value) - margin.left)
        .attr("height", y.bandwidth())
        .attr("fill", (_, i) => getColor(i));

    svg.selectAll("text.bar-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => x(d.value) - 5)
        .attr("y", d => y(d.label) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .text(d => d.label);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
}

export function clearChart() {
    d3.select("#chart").selectAll("*").remove();
}

function getColor(index) {
    const colors = ["red", "blue", "green", "purple", "orange", "yellow"];
    return colors[index % colors.length];
}