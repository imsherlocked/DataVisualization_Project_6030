d3.csv("Main Crime data set .csv").then(function (dataset) {
  var dimensions = {
    width: 1200,
    height: 600,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };

  var data = dataset.map((d) => {
    return {
      Impact1: d.Impact,
      Description1: d.Description,
      Intensity1: d.Intensity,
      Year: d.CrimeDate,
    };
  });

  const allGroup = new Set(data.map((d) => d.Year));
  console.log(allGroup);
  d3.select("#year")
    .selectAll("myOptions")
    .data(allGroup)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    })
    .attr("value", function (d) {
      return d;
    });

  console.log(dataset);

  function updateOnClick(year) {
    document.getElementById("chart").innerHTML = "";

    var svg = d3
      .select("#chart")
      .style("width", dimensions.width)
      .style("height", dimensions.height);

    var xAccessor = (d) => +d.Impact1;
    var yAccessor = (d) => +d.Intensity1;
    var xAccessorNew = (d) => d.Description1;

    var xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, xAccessor))
      .nice()
      .range([
        dimensions.margin.left,
        dimensions.width - dimensions.margin.right,
      ]);

    var yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, yAccessor))
      .nice()
      .range([
        dimensions.height - dimensions.margin.bottom,
        dimensions.margin.top,
      ]);

    var dots = svg
      .selectAll("circle")
      .data(
        data.filter(function (d) {
          return d.Year == year;
        })
      )
      .enter()
      .append("circle")
      //.transition()
      //.duration(1000)
      .attr("cx", (d) => xScale(xAccessor(d)))
      .attr("cy", (d) => yScale(yAccessor(d)))
      .attr("fill", "#3357C0")
      .attr("r", 5)

      .on("click", function (d, i) {
        console.log(d, i);
        document.getElementById("details").innerHTML =
          "Impact: " +
          i.Impact1 +
          ", Intensity: " +
          i.Intensity1 +
          ", Description:" +
          i.Description1;
      });

    var xAxisgen = d3.axisBottom().scale(xScale);
    var yAxisgen = d3.axisLeft().scale(yScale);
    var xAxis = svg
      .append("g")
      .call(xAxisgen)
      .style(
        "transform",
        `translateY(${dimensions.height - dimensions.margin.bottom}px)`
      );
    var yAxis = svg
      .append("g")
      .call(yAxisgen)
      .style("transform", `translateX(${dimensions.margin.left}px)`);
  }

  updateOnClick("2012"); //Default display
  d3.select("#year").on("change", function (event, d) {
    let selectedOption = d3.select(this).property("value");
    updateOnClick(selectedOption);
  });

  var svg = d3
    .select("#viz1")
    .style("widhth", dimensions.width)
    .style("height", dimensions.height);

  var svg1 = d3
    .select("#viz2")
    .style("widhth", dimensions.width)
    .style("height", dimensions.height);

  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.right - dimensions.margin.left;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
});
