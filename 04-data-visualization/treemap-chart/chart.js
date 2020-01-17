var videogameSalesDataURL =
  "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json";

var headings = d3
  .select("#chart")
  .append("div")
  .attr("class", "headings");
headings
  .append("h1")
  .attr("id", "title")
  .text("Video Game Sales");
headings
  .append("h3")
  .attr("id", "description")
  .html("Top 100 Most Sold Video Games Grouped by Platform");

var margin = {top: 10, right: 30, bottom: 120, left: 10},
  width = 1600 - margin.left - margin.right,
  height = 900 - margin.top - margin.bottom;

var fader = function(color) {
  return d3.interpolateRgb(color, "#fff")(0.2);
};
var color = d3.scaleOrdinal(d3.schemeCategory10.map(fader));
var format = d3.format(",d");

var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var treemap = d3
  .treemap()
  .tile(d3.treemapResquarify)
  .size([width, height])
  .round(true)
  .paddingInner(1);

var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

var showTooltip = function(d) {
  var tooltipContent =
    "Name: " +
    d.data.name +
    "<br>Category: " +
    d.data.category +
    "<br>Value: " +
    d.data.value;

  tooltip.style("opacity", 0.9);
  tooltip
    .html(tooltipContent)
    .attr("data-value", d.data.value)
    .style("left", d3.event.pageX + 10 + "px")
    .style("top", d3.event.pageY - 28 + "px");
};

var hideToolip = function(d) {
  tooltip.style("opacity", 0);
};

var buildTreeMap = function(fetchedData) {
  data = fetchedData[0];

  var root = d3
    .hierarchy(data)
    .eachBefore(function(d) {
      d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
    })
    .sum(function(d) {
      return parseFloat(d.value);
    })
    .sort(function(a, b) {
      return b.height - a.height || b.value - a.value;
    });

  treemap(root);

  var cell = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("class", "group")
    .attr("transform", function(d) {
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });

  cell
    .append("rect")
    .attr("id", function(d) {
      return d.data.id;
    })
    .attr("class", "tile")
    .attr("width", function(d) {
      return d.x1 - d.x0;
    })
    .attr("height", function(d) {
      return d.y1 - d.y0;
    })
    .attr("data-name", function(d) {
      return d.data.name;
    })
    .attr("data-category", function(d) {
      return d.data.category;
    })
    .attr("data-value", function(d) {
      return d.data.value;
    })
    .attr("fill", function(d) {
      return color(d.data.category);
    })
    .on("mousemove", showTooltip)
    .on("mouseout", hideToolip);

  cell
    .append("text")
    .attr("class", "tile-text")
    .selectAll("tspan")
    .data(function(d) {
      return d.data.name.split(/(?=[A-Z][^A-Z])/g);
    })
    .enter()
    .append("tspan")
    .attr("x", 4)
    .attr("y", function(d, i) {
      return 13 + i * 10;
    })
    .text(function(d) {
      return d;
    });
};

Promise.all([d3.json(videogameSalesDataURL)]).then(buildTreeMap);
