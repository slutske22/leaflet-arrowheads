var mapOptions = {
  center: [32.96176, -117.03529],
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

var vector1 = L.polyline([
   [map.getCenter().lat-0.001, map.getCenter().lng-0.008],
   [map.getCenter().lat+0.001, map.getCenter().lng-0.008],
]).vectorhat().addTo(map)

var vector2 = L.polyline([
   [map.getCenter().lat-0.002, map.getCenter().lng-0.006],
   [map.getCenter().lat-0.001, map.getCenter().lng-0.007],
   [map.getCenter().lat+0.000, map.getCenter().lng-0.006],
   [map.getCenter().lat+0.001, map.getCenter().lng-0.007],
   [map.getCenter().lat+0.002, map.getCenter().lng-0.006],
]).vectorhats().addTo(map)
