d3.csv("cardio_train.csv").then(function (dataset) {
  var dimensions = {
    width: 400,
    height: 600,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };

  console.log(dataset);

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
