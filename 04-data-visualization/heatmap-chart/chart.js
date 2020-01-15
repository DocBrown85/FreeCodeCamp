var dataURL =
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

d3.json(dataURL).then(function(data) {
  console.log(data);

  data.monthlyVariance.forEach(function(item) {
    item.month -= 1;
  });

  var margin = {top: 10, right: 30, bottom: 120, left: 100},
    width = 1050 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

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

  var variance = data.monthlyVariance.map(function(val) {
    return val.variance;
  });
  var minTemp = data.baseTemperature + Math.min.apply(null, variance);
  var maxTemp = data.baseTemperature + Math.max.apply(null, variance);

  var colorScale = d3
    .scaleSequential(d3.interpolateInferno)
    .domain([minTemp, maxTemp]);

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

  // x axis
  var xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.monthlyVariance.map(function(item) {
        return item.year;
      })
    );

  var xAxis = d3
    .axisBottom(xScale)
    .tickValues(
      data.monthlyVariance
        .map(function(item) {
          return item.year;
        })
        .filter(function(item) {
          return item % 10 == 0;
        })
    )
    .tickFormat(function(year) {
      var date = new Date(0);
      date.setUTCFullYear(year);
      return d3.timeFormat("%Y")(date);
    });

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("class", "y-axis")
    .call(yAxis);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("class", "x-axis")
    .attr("transform", "translate(0" + "," + height + ")")
    .call(xAxis);

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Years");

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -margin.top + 30)
    .text("Months");

  // Tooltip
  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  var mouseover = function(d) {
    tooltip.style("opacity", 0.9);
    tooltip.attr("data-year", d.year);
    var date = new Date(d.year, d.month);
    var tootlipContent =
      "<span class='date'>" +
      d3.timeFormat("%Y - %B")(date) +
      "</span>" +
      "<br />" +
      "<span class='temperature'>" +
      d3.format(".1f")(data.baseTemperature + d.variance) +
      "&#8451;" +
      "</span>" +
      "<br />" +
      "<span class='variance'>" +
      d3.format("+.1f")(d.variance) +
      "&#8451;" +
      "</span>";
    tooltip.html(tootlipContent);
    tooltip.style("left", d3.event.pageX + 28 + "px");
    tooltip.style("top", d3.event.pageY - 28 + "px");
  };

  var mouseleave = function(d) {
    tooltip.style("opacity", 0);
  };

  // Heat Map

  svg
    .append("g")
    .attr("class", "heat-map")
    .attr("transform", "translate(" + 0 + "," + 0 + ")")
    .selectAll("rect")
    .data(data.monthlyVariance)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("data-month", function(d) {
      return d.month;
    })
    .attr("data-year", function(d) {
      return d.year;
    })
    .attr("data-temp", function(d) {
      return data.baseTemperature + d.variance;
    })
    .attr("x", function(d, i) {
      return xScale(d.year);
    })
    .attr("y", function(d, i) {
      return yScale(d.month);
    })
    .attr("width", function(d, i) {
      return xScale.bandwidth(d.year);
    })
    .attr("height", function(d, i) {
      return yScale.bandwidth(d.month);
    })
    .style("fill", function(d) {
      return colorScale(data.baseTemperature + d.variance);
    })
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave);

  // Legend
  var legendKeysCount = 5;

  var legendKeys = (function(min, max, count) {
    var array = [];
    var step = (max - min) / count;
    var base = min;
    for (var i = 1; i <= count; i++) {
      array.push(base + i * step);
    }
    return array;
  })(minTemp, maxTemp, legendKeysCount);

  var legendDisplacement = 50;
  var legendWidth = 250;

  var legendScaleX = d3
    .scaleBand()
    .rangeRound([0, legendWidth])
    .domain(legendKeys);

  var legend = svg
    .append("g")
    .attr("id", "legend")
    .attr("transform", "translate(0," + (height + legendDisplacement) + ")");

  legend
    .append("g")
    .attr("id", "legend-x-axis")
    .attr("transform", "translate(0," + legendScaleX.bandwidth() + ")")
    .call(d3.axisBottom(legendScaleX).tickFormat(d3.format(".1f")));

  legend
    .selectAll(".legend-item")
    .data(legendKeys)
    .enter()
    .append("rect")
    .attr("class", "legend-item")
    .attr("x", function(d) {
      return legendScaleX(d);
    })
    .attr("width", legendScaleX.bandwidth())
    .attr("height", legendScaleX.bandwidth())
    .style("fill", function(d) {
      return colorScale(d);
    });
});
