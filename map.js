<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Baltimore City Crime Data Visualization</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>

    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />

    <!-- Load Leaflet from CDN -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      crossorigin=""
    />
    <script
      src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
      integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
      crossorigin=""
    ></script>
    <!-- Load Esri Leaflet from CDN -->
    <script
      src="https://unpkg.com/esri-leaflet@3.0.3/dist/esri-leaflet.js"
      integrity="sha512-kuYkbOFCV/SsxrpmaCRMEFmqU08n6vc+TfAVlIKjR1BPVgt75pmtU9nbQll+4M9PN2tmZSAgD1kGUCKL88CscA=="
      crossorigin=""
    ></script>

    <!-- Load Esri Leaflet Vector from CDN -->
    <script
      src="https://unpkg.com/esri-leaflet-vector@3.1.1/dist/esri-leaflet-vector.js"
      integrity="sha512-7rLAors9em7cR3/583gZSvu1mxwPBUjWjdFJ000pc4Wpu+fq84lXF1l4dbG4ShiPQ4pSBUTb4e9xaO6xtMZIlA=="
      crossorigin=""
    ></script>

    <style>
      #map {
        height: 550px;
        width: 700px;
        margin: 0;
      }

      .chart-container {
        height: 550px;
        width: 710px;
      }

      #info-pane {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 400;
        padding: 0;
        background: white;
      }

      body {
        font-family: Arial;
      }

    </style>
  </head>
  <body id="body" style="background-color: grey">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.1.1/d3.min.js"></script>
    <div>
      <div id="map"></div>
      <div id="info-pane" class="leaflet-bar chart-container">
        <canvas id="chartCanvas"></canvas>
        <script src="map.js"></script>
      </div>
      <div></div>
      <br /><br />
      <div position:relative; id="my_dataviz" class="svg-container">
        <div width="1000px" height="400px">
          <svg id="map" width="450" height="1060" style="float: left"></svg>
          <div id="details"></div>
        </div>
        <div></div>
        <div width="1000px" height="400px">
          <svg id="line" width="450" height="650" style="float: right"></svg>
        </div>
      </div>
      <script src="script1.js"></script>
    </div>
  </body>
</html>