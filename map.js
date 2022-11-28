var map = L.map("map").setView([39.324, -76.612], 12);

L.esri.Vector.vectorBasemapLayer("ArcGIS:Community", {
  apikey:
    "AAPK8259af609fad4afaad0554ebf97205c9ps9yDjujF4N1L4UjHBywwT-yYLQiyUni7Sca8I_7F5k9tJ6zImhOpMi4Pg62uX7w",
}).addTo(map);

var treesFeatureLayer = L.esri
  .featureLayer({
    url: "https://services3.arcgis.com/bO7Hf5i6aZdITjmq/arcgis/rest/services/final_data/FeatureServer/0",
  })
  .addTo(map);

var initialChartData = {
  datasets: [
    {
      label: "Crime HotSpots in Baltimore from 2012 to 2017",
      data: [],
    },
  ],
};

var chartOptions = {
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Impact",
        },
        ticks: {
          beginAtZero: true,
          max: 1,
          stepSize: 0.2,
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Intensity",
        },
        ticks: {
          beginAtZero: true,
          max: 2000,
          stepSize: 200,
        },
      },
    ],
  },
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  onHover: handleChartHover,
};

var chart = new Chart("chartCanvas", {
  type: "scatter",
  data: initialChartData,
  options: chartOptions,
});

map.on("zoom move", updateChart);
treesFeatureLayer.on("load", updateChart);

function updateChart() {
  var scatterPlotDataArray = [];

  treesFeatureLayer.eachActiveFeature(function (e) {
    scatterPlotDataArray.push({
      x: e.feature.properties.Impact,
      y: e.feature.properties.Intensity,
      featureId: e.feature.id,
    });
  });

  chart.data.datasets[0].data = scatterPlotDataArray;

  chart.update();
}

// STEP 4 : ESTABLISH CHART-TO-MAP COMMUNICATION

function handleChartHover(e) {
  var chartHoverData = chart.getElementsAtEvent(e);

  if (!chartHoverData.length) {
    treesFeatureLayer.eachFeature(function (e) {
      e.setOpacity(1);
      e.setZIndexOffset(0);
    });

    return;
  }

  var hoverFeatureIds = chartHoverData.map(function (datum) {
    return chart.data.datasets[0].data[datum._index].featureId;
  });

  treesFeatureLayer.eachFeature(function (e, idx) {
    if (hoverFeatureIds.indexOf(e.feature.id) > -1) {
      e.setOpacity(1);
      e.setZIndexOffset(1000);
    } else {
      e.setOpacity(0.01);
    }
  });
}
