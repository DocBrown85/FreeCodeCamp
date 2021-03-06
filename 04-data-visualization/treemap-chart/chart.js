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

var width = 960;
var height = 570;

var fader = function(color) {
  return d3.interpolateRgb(color, "#fff")(0.2);
};
var color = d3.scaleOrdinal(d3.schemeCategory10.map(fader));
var format = d3.format(",d");

var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var treemap = d3
  .treemap()
  .size([width, height])
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

var legend = d3
  .select("body")
  .append("svg")
  .attr("class", "legend")
  .attr("id", "legend");

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

  var categories = root.leaves().map(function(nodes) {
    return nodes.data.category;
  });
  categories = categories.filter(function(category, index, self) {
    return self.indexOf(category) === index;
  });
  var legend = d3.select("#legend");
  var legendWidth = 500;
  const LEGEND_OFFSET = 10;
  const LEGEND_RECT_SIZE = 15;
  const LEGEND_H_SPACING = 150;
  const LEGEND_V_SPACING = 10;
  const LEGEND_TEXT_X_OFFSET = 3;
  const LEGEND_TEXT_Y_OFFSET = -2;
  var legendItemsPerRow = Math.floor(legendWidth / LEGEND_H_SPACING);

  var legendItem = legend
    .append("g")
    .attr("transform", "translate(60," + LEGEND_OFFSET + ")")
    .selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
      return (
        "translate(" +
        (i % legendItemsPerRow) * LEGEND_H_SPACING +
        "," +
        (Math.floor(i / legendItemsPerRow) * LEGEND_RECT_SIZE +
          LEGEND_V_SPACING * Math.floor(i / legendItemsPerRow)) +
        ")"
      );
    });

  legendItem
    .append("rect")
    .attr("width", LEGEND_RECT_SIZE)
    .attr("height", LEGEND_RECT_SIZE)
    .attr("class", "legend-item")
    .attr("fill", function(d) {
      return color(d);
    });

  legendItem
    .append("text")
    .attr("x", LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
    .attr("y", LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
    .text(function(d) {
      return d;
    });
};

Promise.all([d3.json(videogameSalesDataURL)]).then(buildTreeMap);
