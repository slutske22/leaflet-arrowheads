var mapOptions = {
  center: [36.8, -122.1408],
  zoom: 16,
  zoomDelta: 0.5,
  zoomSnap: 0
}

const map = L.map('mapID', mapOptions)

var mbStandardOutdoorLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
   }).addTo(map)

// var simpleVector1 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng-0.15],
//    [map.getCenter().lat+0.05, map.getCenter().lng-0.15 + 0.05],
// ]).vectorhats().addTo(map)
//
// var simpleVector2 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng-0.05],
//    [map.getCenter().lat+0.05, map.getCenter().lng-0.05 + 0.05],
// ]).vectorhats().addTo(map)
//
// var simpleVector3 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng+0.05],
//    [map.getCenter().lat+0.05, map.getCenter().lng+0.05 + 0.05],
// ]).vectorhats({yawn: 45, size: '50px'}).addTo(map)
//
// var simpleVector4 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng+0.15],
//    [map.getCenter().lat+0.05, map.getCenter().lng+0.15 + 0.05],
// ]).vectorhats().addTo(map)




var multiVector1 = L.polyline([
   [map.getCenter().lat-0.002, map.getCenter().lng-0.006],
   [map.getCenter().lat-0.001, map.getCenter().lng-0.007],
   [map.getCenter().lat+0.000, map.getCenter().lng-0.006],
   [map.getCenter().lat+0.001, map.getCenter().lng-0.007],
   [map.getCenter().lat+0.002, map.getCenter().lng-0.006],
], {smoothFactor: 1, weight: 2}).vectorhats({endOnly: true}).addTo(map)

var multiVector2 = L.polyline([
   [
      [map.getCenter().lat-0.002, map.getCenter().lng-0.004],
      [map.getCenter().lat-0.001, map.getCenter().lng-0.005],
      [map.getCenter().lat+0.000, map.getCenter().lng-0.004]
   ],
   [
      [map.getCenter().lat+0.001, map.getCenter().lng-0.005],
      [map.getCenter().lat+0.002, map.getCenter().lng-0.004]
   ]
], {smoothFactor: 30}).vectorhats().addTo(map)

var multiVector3 = L.polyline([
   [map.getCenter().lat-0.002, map.getCenter().lng-0.003],
   [map.getCenter().lat-0.0015, map.getCenter().lng-0.0025],
   [map.getCenter().lat-0.0005, map.getCenter().lng-0.0025],
   [map.getCenter().lat+0.000, map.getCenter().lng-0.003],
   [map.getCenter().lat+0.001, map.getCenter().lng-0.0025],
   [map.getCenter().lat+0.0015, map.getCenter().lng-0.0025],
   [map.getCenter().lat+0.002, map.getCenter().lng-0.003],
], {smoothFactor: 10, weight: 2}).vectorhats().addTo(map)
