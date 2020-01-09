var dataURL =
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

d3.json(dataURL).then(function(data) {
  console.log(data);

  var margin = {top: 30, right: 30, bottom: 30, left: 70},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  var headings = d3.select("#chart").append("div");
  headings
    .append("h1")
    .attr("id", "title")
    .text("Monthly Global Land-Surface Temperature");
  headings
    .append("h3")
    .attr("id", "description")
    .html(
      data.monthlyVariance[0].year +
        " - " +
        data.monthlyVariance[data.monthlyVariance.length - 1].year +
        ": base temperature " +
        data.baseTemperature +
        "&#8451;"
    );

  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // y axis
  var yScale = d3
    .scaleBand()
    .range([0, height])
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

  var yAxis = d3
    .axisLeft(yScale)
    .tickValues(yScale.domain())
    .tickFormat(function(month) {
      var date = new Date(0);
      date.setUTCMonth(month);
      return d3.timeFormat("%B")(date);
    });

  svg
    .append("g")
    .attr("id", "y-axis")
    .call(yAxis);
});
