import { } from './leaflet-arrowheads.js'

var mapOptions = {
  center:   [
      34.02556114475524,
      -118.78169059753418
    ],
  zoom: 12,
  zoomDelta: 0.5,
  zoomSnap: 0,
  wheelPxPerZoomLevel: 100
}

const map = L.map('mapID', mapOptions)

var mbStandardOutdoorLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
   }).addTo(map)
//
// var simpleVector0 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng-0.25],
//    [map.getCenter().lat+0.05, map.getCenter().lng-0.25 + 0.05],
// ], {color: 'black'}).arrowheads()
//
// var simpleVector1 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng-0.15],
//    [map.getCenter().lat+0.05, map.getCenter().lng-0.15 + 0.05],
// ], {color: 'blue'}).arrowheads({frequency: '50px'})
//
// var simpleVector2 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng-0.05],
//    [map.getCenter().lat+0.05, map.getCenter().lng-0.05 + 0.05],
// ], {color: 'purple'}).arrowheads()
//
// var simpleVector3 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng+0.05],
//    [map.getCenter().lat+0.05, map.getCenter().lng+0.05 + 0.05],
// ], {color: 'green'}).arrowheads()
//
// var simpleVector4 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng+0.15],
//    [map.getCenter().lat+0.05, map.getCenter().lng+0.15 + 0.05],
// ], {color: 'orange'}).arrowheads()
//
// var simpleVector5 = L.polyline([
//    [map.getCenter().lat-0.05, map.getCenter().lng+0.25],
//    [map.getCenter().lat+0.05, map.getCenter().lng+0.25 + 0.05],
// ], {color: 'red'}).arrowheads()
//
// var group = L.layerGroup([
//    simpleVector0, simpleVector1, simpleVector2, simpleVector3, simpleVector4, simpleVector5
// ])
//
// group.addTo(map)


//
//
// var multiVector1 = L.polyline([
//    [map.getCenter().lat-0.002, map.getCenter().lng-0.006],
//    [map.getCenter().lat-0.001, map.getCenter().lng-0.007],
//    [map.getCenter().lat+0.000, map.getCenter().lng-0.006],
//    [map.getCenter().lat+0.001, map.getCenter().lng-0.007],
//    [map.getCenter().lat+0.002, map.getCenter().lng-0.006],
// ], {smoothFactor: 1, weight: 2}).arrowheads({fill: true}).addTo(map)
// //
// var multiVector2 = L.polyline([
//    [
//       [map.getCenter().lat-0.2, map.getCenter().lng-0.4 + 0.5],
//       [map.getCenter().lat-0.1, map.getCenter().lng-0.5 + 0.5],
//       [map.getCenter().lat+0.0, map.getCenter().lng-0.4 + 0.5]
//    ],
//    [
//       [map.getCenter().lat+0.1, map.getCenter().lng-0.5 + 0.5],
//       [map.getCenter().lat+0.2, map.getCenter().lng-0.4 + 0.5]
//    ]
// ], {smoothFactor: 30}).arrowheads({size: '10%', endOnly: true}).addTo(map)
//
// var multiVector3 = L.polyline([
//    [map.getCenter().lat-0.30 + 0.5, map.getCenter().lng-0.20],
//    [map.getCenter().lat-0.25 + 0.5, map.getCenter().lng-0.15],
//    [map.getCenter().lat-0.22 + 0.5, map.getCenter().lng-0.10],
//    [map.getCenter().lat-0.25 + 0.5, map.getCenter().lng-0.05],
//    [map.getCenter().lat-0.30 + 0.5, map.getCenter().lng+0.00],
//    [map.getCenter().lat-0.30 + 0.5, map.getCenter().lng+0.05],
//    [map.getCenter().lat-0.25 + 0.5, map.getCenter().lng+0.10],
//    [map.getCenter().lat-0.25 + 0.5, map.getCenter().lng+0.15],
//    [map.getCenter().lat-0.30 + 0.5, map.getCenter().lng+0.20],
// ], {smoothFactor: 10, weight: 2}).arrowheads({size: '20%', frequency: 20}).addTo(map)


var malibuPathPoints = [
  [
    34.047112447489766,
    -118.92691612243652
  ],
  [
    34.047112447489766,
    -118.92549991607666
  ],
  [
    34.04675685986366,
    -118.92356872558594
  ],
  [
    34.044907780170604,
    -118.91721725463866
  ],
  [
    34.04369874472491,
    -118.9106512069702
  ],
  [
    34.042560813265304,
    -118.90176773071289
  ],
  [
    34.04156511071315,
    -118.89490127563475
  ],
  [
    34.04060495789538,
    -118.88764858245848
  ],
  [
    34.04000041165585,
    -118.88121128082274
  ],
  [
    34.03964479420797,
    -118.87314319610594
  ],
  [
    34.0392536132932,
    -118.86962413787842
  ],
  [
    34.03822230950643,
    -118.86610507965086
  ],
  [
    34.036550859499016,
    -118.86129856109618
  ],
  [
    34.03601741107435,
    -118.85477542877196
  ],
  [
    34.03434591762097,
    -118.84988307952881
  ],
  [
    34.032852214755096,
    -118.84584903717041
  ],
  [
    34.029722466330576,
    -118.8416004180908
  ],
  [
    34.0259879563598,
    -118.83649349212645
  ],
  [
    34.02381830842462,
    -118.8325881958008
  ],
  [
    34.02221771291966,
    -118.8301420211792
  ],
  [
    34.0193721352679,
    -118.82670879364015
  ],
  [
    34.017095604460124,
    -118.8238763809204
  ],
  [
    34.01659760520752,
    -118.8218593597412
  ],
  [
    34.016455319170184,
    -118.81941318511961
  ],
  [
    34.016917747919564,
    -118.8172674179077
  ],
  [
    34.01791373974716,
    -118.8151216506958
  ],
  [
    34.02061708722915,
    -118.81190299987793
  ],
  [
    34.0221110054794,
    -118.80911350250244
  ],
  [
    34.02239555835533,
    -118.80722522735596
  ],
  [
    34.02221771291966,
    -118.80542278289794
  ],
  [
    34.02161303565095,
    -118.8028049468994
  ],
  [
    34.0208305057319,
    -118.79988670349121
  ],
  [
    34.02043923806691,
    -118.79726886749268
  ],
  [
    34.0206882267897,
    -118.79533767700195
  ],
  [
    34.02139961911581,
    -118.79306316375731
  ],
  [
    34.023000230049014,
    -118.78945827484131
  ],
  [
    34.024351833551606,
    -118.78602504730225
  ],
  [
    34.02556114475524,
    -118.78169059753418
  ],
  [
    34.02602352389661,
    -118.77890110015869
  ],
  [
    34.02591682124144,
    -118.7761116027832
  ],
  [
    34.02559671247093,
    -118.7734079360962
  ],
  [
    34.02552557702461,
    -118.76958847045898
  ],
  [
    34.025774550825844,
    -118.76602649688719
  ],
  [
    34.02623692880446,
    -118.76263618469237
  ],
  [
    34.0281575488251,
    -118.75825881958009
  ],
  [
    34.02982916420039,
    -118.7550401687622
  ],
  [
    34.031109528172735,
    -118.75061988830566
  ],
  [
    34.03256769694176,
    -118.74555587768553
  ],
  [
    34.03320786068001,
    -118.7425947189331
  ],
  [
    34.03335011863251,
    -118.739333152771
  ],
  [
    34.03356350511403,
    -118.73602867126465
  ],
  [
    34.03335011863251,
    -118.73285293579102
  ],
  [
    34.03370576247019,
    -118.72967720031738
  ],
  [
    34.034096968969656,
    -118.72624397277832
  ],
  [
    34.034132533107424,
    -118.72246742248535
  ],
  [
    34.03388358382995,
    -118.71881961822511
  ],
  [
    34.03377689105882,
    -118.7151288986206
  ],
  [
    34.034239225431264,
    -118.71053695678711
  ],
  [
    34.0346659933849,
    -118.70547294616698
  ]
]

var malibuPath = L.polyline([malibuPathPoints], {smoothFactor: 1.5, weight: 2}).arrowheads({size: '50%', frequency: '50px'}).addTo(map)

window.malibuPath = malibuPath
window.map = map

// var norwayPathPoints = [
//    [
//       58.83080439883584,
//       10.711669921874998
//    ],
//    [
//       60.18570156483399,
//       8.171253204345703
//    ]
// ]
//
// var norwayPath = L.polyline(norwayPathPoints).arrowheads({size: '15px', fill: true}).addTo(map)
