var mapOptions = {
  center: [36.8, -122.1408],
  zoom: 10,
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

// var simpleVector0 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng-0.25],
//    [map.getCenter().lat+0.05, map.getCenter().lng-0.25 + 0.05],
// ], {color: 'black'}).vectorhats()
//
// var simpleVector1 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng-0.15],
//    [map.getCenter().lat+0.05, map.getCenter().lng-0.15 + 0.05],
// ], {color: 'blue'}).vectorhats()
//
// var simpleVector2 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng-0.05],
//    [map.getCenter().lat+0.05, map.getCenter().lng-0.05 + 0.05],
// ], {color: 'purple'}).vectorhats()
//
// var simpleVector3 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng+0.05],
//    [map.getCenter().lat+0.05, map.getCenter().lng+0.05 + 0.05],
// ], {color: 'green'}).vectorhats()
//
// var simpleVector4 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng+0.15],
//    [map.getCenter().lat+0.05, map.getCenter().lng+0.15 + 0.05],
// ], {color: 'orange'}).vectorhats()
//
// var simpleVector5 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng+0.25],
//    [map.getCenter().lat+0.05, map.getCenter().lng+0.25 + 0.05],
// ], {color: 'red'}).vectorhats()
//
// var group = L.layerGroup([
//    simpleVector0, simpleVector1, simpleVector2, simpleVector3, simpleVector4, simpleVector5
// ])
//
// group.addTo(map)




var multiVector1 = L.polyline([
   [map.getCenter().lat-0.002, map.getCenter().lng-0.006],
   [map.getCenter().lat-0.001, map.getCenter().lng-0.007],
   [map.getCenter().lat+0.000, map.getCenter().lng-0.006],
   [map.getCenter().lat+0.001, map.getCenter().lng-0.007],
   [map.getCenter().lat+0.002, map.getCenter().lng-0.006],
], {smoothFactor: 1, weight: 2}).vectorhats({fill: true}).addTo(map)

var multiVector2 = L.polyline([
   [
      [map.getCenter().lat-0.2, map.getCenter().lng-0.4 + 0.5],
      [map.getCenter().lat-0.1, map.getCenter().lng-0.5 + 0.5],
      [map.getCenter().lat+0.0, map.getCenter().lng-0.4 + 0.5]
   ],
   [
      [map.getCenter().lat+0.1, map.getCenter().lng-0.5 + 0.5],
      [map.getCenter().lat+0.2, map.getCenter().lng-0.4 + 0.5]
   ]
], {smoothFactor: 30}).vectorhats({size: '10%', endOnly: true}).addTo(map)

var multiVector3 = L.polyline([
   [map.getCenter().lat-0.2, map.getCenter().lng-0.3 + 0.5],
   [map.getCenter().lat-0.15, map.getCenter().lng-0.25 + 0.5],
   [map.getCenter().lat-0.05, map.getCenter().lng-0.25 + 0.5],
   [map.getCenter().lat+0.0, map.getCenter().lng-0.3 + 0.5],
   [map.getCenter().lat+0.1, map.getCenter().lng-0.25 + 0.5],
   [map.getCenter().lat+0.15, map.getCenter().lng-0.25 + 0.5],
   [map.getCenter().lat+0.2, map.getCenter().lng-0.3 + 0.5],
], {smoothFactor: 10, weight: 2}).vectorhats({size: '10%',  proportionalToTotal: false, endOnly: false, proportionalToRemainder: true}).addTo(map)
