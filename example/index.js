var mapOptions = {
	center: [32.02556114475524, -119.78169059753418],
	zoom: 9,
	wheelPxPerZoomLevel: 100,
};

const map = L.map('mapID', mapOptions);

map.on('popupopen', () => {
	hljs.highlightAll();
});

const myLayer = new L.TileLayer(
	'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{
		attribution:
			'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
	}
);

myLayer.addTo(map);

var boatIcon = L.icon({
	iconUrl: 'boat.png',
	iconSize: [32, 32],
	shadowSize: [0, 0],
	iconAnchor: [16, 16],
	shadowAnchor: [4, 62],
	popupAnchor: [-3, -76],
});

//  ------- GROUP 1: Arrowhead Color, Fill, and Yawn Options --------------//

let group1Offsetx = 0.4,
	group1Offsety = 0.55;

var simpleVector0 = L.polyline(
	[
		[
			map.getCenter().lat - 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety - 0.25,
		],
		[
			map.getCenter().lat + 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety - 0.25 + 0.05,
		],
	],
	{ color: 'black' }
)
	.arrowheads()
	.bindPopup(`<pre><code>L.polyline(coords).arrowheads()</code></pre>`, {
		maxWidth: 2000,
		minWidth: 400,
	});

var simpleVector1 = L.polyline(
	[
		[
			map.getCenter().lat - 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety - 0.15,
		],
		[
			map.getCenter().lat + 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety - 0.15 + 0.05,
		],
	],
	{ color: 'blue', weight: 2 }
)
	.arrowheads()
	.bindPopup(
		`<pre><code>L.polyline(coords, { color: 'blue', weight: 2 })
  .arrowheads();</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var simpleVector2 = L.polyline(
	[
		[
			map.getCenter().lat - 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety - 0.05,
		],
		[
			map.getCenter().lat + 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety - 0.05 + 0.05,
		],
	],
	{ color: 'purple' }
)
	.arrowheads({ fill: true })
	.bindPopup(
		`<pre><code>var simpleVector1 = L.polyline(coords)
  .arrowheads({ fill: true });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var simpleVector3 = L.polyline(
	[
		[
			map.getCenter().lat - 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety + 0.05,
		],
		[
			map.getCenter().lat + 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety + 0.05 + 0.05,
		],
	],
	{ color: 'green' }
)
	.arrowheads({ color: 'black' })
	.bindPopup(
		`<pre><code>L.polyline(coords, { color: 'green' })
  .arrowheads({ color: 'black' })</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var simpleVector4 = L.polyline(
	[
		[
			map.getCenter().lat - 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety + 0.15,
		],
		[
			map.getCenter().lat + 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety + 0.15 + 0.05,
		],
	],
	{ color: 'orange', weight: 2 }
)
	.arrowheads({ yawn: 40 })
	.bindPopup(
		`<pre><code>L.polyline(coords, { color: 'orange', weight: 2 })
  .arrowheads({ yawn: 40 });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var simpleVector5 = L.polyline(
	[
		[
			map.getCenter().lat - 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety + 0.25,
		],
		[
			map.getCenter().lat + 0.05 + group1Offsetx,
			map.getCenter().lng - group1Offsety + 0.25 + 0.05,
		],
	],
	{ color: 'red' }
)
	.arrowheads({ fill: true, color: 'purple' })
	.bindPopup(
		`<pre><code>var simpleVector1 = L.polyline()
  .arrowheads({ fill: true, color: 'purple' });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var group1 = L.layerGroup([
	simpleVector0,
	simpleVector1,
	simpleVector2,
	simpleVector3,
	simpleVector4,
	simpleVector5,
]);

group1.addTo(map);

//  ------- GROUP 2: Arrowhead Size Options------------------------//

var group2offsetx = 0.6;
var group2offsety = 0.05;

var multiVector1 = L.polyline(
	[
		[
			[
				map.getCenter().lat - 0.2 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx,
			],
			[
				map.getCenter().lat - 0.1 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx,
			],
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx,
			],
		],
		[
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx,
			],
			[
				map.getCenter().lat + 0.1 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx,
			],
		],
	],
	{ smoothFactor: 30 }
)
	.arrowheads()
	.bindPopup(`<pre><code>L.polyline(coords).arrowheads()</code></pre>`, {
		maxWidth: 2000,
		minWidth: 400,
	});

var multiVector2 = L.polyline(
	[
		[
			[
				map.getCenter().lat - 0.2 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.15,
			],
			[
				map.getCenter().lat - 0.1 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx + 0.15,
			],
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.15,
			],
		],
		[
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx + 0.15,
			],
			[
				map.getCenter().lat + 0.1 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.15,
			],
		],
	],
	{ smoothFactor: 30, color: 'black' }
)
	.arrowheads({ size: '10%', frequency: 'endonly' })
	.bindPopup(
		`<pre><code>L.polyline(coords)
  .arrowheads({ 
    size: '10%', 
    frequency: 'endonly' 
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var multiVector3 = L.polyline(
	[
		[
			[
				map.getCenter().lat - 0.2 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.3,
			],
			[
				map.getCenter().lat - 0.1 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx + 0.3,
			],
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.3,
			],
		],
		[
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx + 0.3,
			],
			[
				map.getCenter().lat + 0.1 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.3,
			],
		],
	],
	{ smoothFactor: 30, color: 'purple' }
)
	.arrowheads({ size: '10%', frequency: '3000m' })
	.bindPopup(
		`<pre><code>L.polyline(coords)
  .arrowheads({
    size: '10%', 
    frequency: '3000m'
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var multiVector4 = L.polyline(
	[
		[
			[
				map.getCenter().lat - 0.2 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.45,
			],
			[
				map.getCenter().lat - 0.1 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx + 0.45,
			],
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.45,
			],
		],
		[
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx + 0.45,
			],
			[
				map.getCenter().lat + 0.1 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.45,
			],
		],
	],
	{ smoothFactor: 30, color: 'green' }
)
	.arrowheads({ size: '10%', frequency: '50px', fill: true, yawn: 30 })
	.bindPopup(
		`<pre><code>L.polyline(coords)
  .arrowheads({
    size: '10%',
    frequency: '50px', 
    fill: true, 
    yawn: 30
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var multiVector5 = L.polyline(
	[
		[
			[
				map.getCenter().lat - 0.2 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.6,
			],
			[
				map.getCenter().lat - 0.1 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx + 0.6,
			],
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.6,
			],
		],
		[
			[
				map.getCenter().lat + 0.0 + group2offsety,
				map.getCenter().lng - 0.5 + group2offsetx + 0.6,
			],
			[
				map.getCenter().lat + 0.1 + group2offsety,
				map.getCenter().lng - 0.4 + group2offsetx + 0.6,
			],
		],
	],
	{ smoothFactor: 30, color: 'darkred' }
)
	.arrowheads({ size: '15px', frequency: '50px', fill: true, yawn: 30 })
	.bindPopup(
		`<pre><code>L.polyline(coords)
  .arrowheads({
    size: '15px', 
    frequency: '50px', 
    fill: true, 
    yawn: 30
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var group2 = L.layerGroup([
	multiVector1,
	multiVector2,
	multiVector3,
	multiVector4,
	multiVector5,
]);

group2.addTo(map);

//  ------- GROUP 3: Arrowhead frequency options --------------------//

var malibuPathPoints = [
	[34.047112447489766, -118.92691612243652],
	[34.047112447489766, -118.92549991607666],
	[34.04675685986366, -118.92356872558594],
	[34.044907780170604, -118.91721725463866],
	[34.04369874472491, -118.9106512069702],
	[34.042560813265304, -118.90176773071289],
	[34.04156511071315, -118.89490127563475],
	[34.04060495789538, -118.88764858245848],
	[34.04000041165585, -118.88121128082274],
	[34.03964479420797, -118.87314319610594],
	[34.0392536132932, -118.86962413787842],
	[34.03822230950643, -118.86610507965086],
	[34.036550859499016, -118.86129856109618],
	[34.03601741107435, -118.85477542877196],
	[34.03434591762097, -118.84988307952881],
	[34.032852214755096, -118.84584903717041],
	[34.029722466330576, -118.8416004180908],
	[34.0259879563598, -118.83649349212645],
	[34.02381830842462, -118.8325881958008],
	[34.02221771291966, -118.8301420211792],
	[34.0193721352679, -118.82670879364015],
	[34.017095604460124, -118.8238763809204],
	[34.01659760520752, -118.8218593597412],
	[34.016455319170184, -118.81941318511961],
	[34.016917747919564, -118.8172674179077],
	[34.01791373974716, -118.8151216506958],
	[34.02061708722915, -118.81190299987793],
	[34.0221110054794, -118.80911350250244],
	[34.02239555835533, -118.80722522735596],
	[34.02221771291966, -118.80542278289794],
	[34.02161303565095, -118.8028049468994],
	[34.0208305057319, -118.79988670349121],
	[34.02043923806691, -118.79726886749268],
	[34.0206882267897, -118.79533767700195],
	[34.02139961911581, -118.79306316375731],
	[34.023000230049014, -118.78945827484131],
	[34.024351833551606, -118.78602504730225],
	[34.02556114475524, -118.78169059753418],
	[34.02602352389661, -118.77890110015869],
	[34.02591682124144, -118.7761116027832],
	[34.02559671247093, -118.7734079360962],
	[34.02552557702461, -118.76958847045898],
	[34.025774550825844, -118.76602649688719],
	[34.02623692880446, -118.76263618469237],
	[34.0281575488251, -118.75825881958009],
	[34.02982916420039, -118.7550401687622],
	[34.031109528172735, -118.75061988830566],
	[34.03256769694176, -118.74555587768553],
	[34.03320786068001, -118.7425947189331],
	[34.03335011863251, -118.739333152771],
	[34.03356350511403, -118.73602867126465],
	[34.03335011863251, -118.73285293579102],
	[34.03370576247019, -118.72967720031738],
	[34.034096968969656, -118.72624397277832],
	[34.034132533107424, -118.72246742248535],
	[34.03388358382995, -118.71881961822511],
	[34.03377689105882, -118.7151288986206],
	[34.034239225431264, -118.71053695678711],
	[34.0346659933849, -118.70547294616698],
];

var group3offsetx = 0.2,
	group3offsety = -0.1;

var path1points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 1.8, point[1] + group3offsetx - 1.7];
});

var path2points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 1.85, point[1] + group3offsetx - 1.7];
});

var path3points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 1.9, point[1] + group3offsetx - 1.7];
});

var path4points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 1.95, point[1] + group3offsetx - 1.7];
});

var path5points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 2, point[1] + group3offsetx - 1.7];
});

var path6points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 2.05, point[1] + group3offsetx - 1.7];
});

// Offset path points:
var path7points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 2.15, point[1] + group3offsetx - 1.7];
});

var path8points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 2.23, point[1] + group3offsetx - 1.7];
});

var path9points = [
	malibuPathPoints.map((point) => {
		return [point[0] + group3offsety - 2.3, point[1] + group3offsetx - 1.7];
	}),
	malibuPathPoints.map((point) => {
		return [point[0] + group3offsety - 2.275, point[1] + group3offsetx - 1.7];
	}),
];

var path1 = L.polyline([path1points], { smoothFactor: 1.5, weight: 2 })
	.arrowheads()
	.bindPopup(`<pre><code>L.polyline(coords).arrowheads({})</code></pre>`, {
		maxWidth: 2000,
		minWidth: 400,
	});

var path2 = L.polyline([path2points], { smoothFactor: 1.5, weight: 2 })
	.arrowheads({ size: '50%', frequency: 'endonly' })
	.bindPopup(
		`<pre><code>L.polyline(coords)
  .arrowheads({ 
    size: '50%', 
    frequency: 'endonly' 
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var path3 = L.polyline([path3points], { smoothFactor: 1.5, weight: 2 })
	.arrowheads({ size: '25%', frequency: 'endonly', proportionalToTotal: true })
	.bindPopup(
		`<pre><code>var path3 = L.polyline(coords)
  .arrowheads({ 
    size: '25%', 
    frequency: 'endonly', 
    proportionalToTotal: true
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var path4 = L.polyline([path4points], { smoothFactor: 1.5, weight: 2 })
	.arrowheads({
		frequency: '500m',
		color: 'darkblue',
		perArrowheadOptions: (i) => ({
			size: i % 3 === 0 ? '30%' : '15%',
			color: i % 2 === 0 ? 'red' : undefined,
			fill: (i + 1) % 4 === 0,
			yawn: (i + 1) % 4 === 0 ? 35 : undefined,
		}),
	})
	.bindPopup(
		`<pre><code>var path4 = L.polyline(coords)
  .arrowheads({ 
    frequency: '500m',
    color: 'darkblue',
    perArrowheadOptions: (i) => ({ 
      color: i % 2 === 0 ? 'red' : undefined, 
      size: i % 3 === 0 ? '30%' : '15%',
      fill: (i + 1) % 4 === 0,
      yawn: (i + 1) % 4 === 0 ? 35 : undefined,
    })
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var path5 = L.polyline([path5points], { smoothFactor: 1.5, weight: 2 })
	.arrowheads({ frequency: '50px' })
	.bindPopup(
		`<pre><code>L.polyline(coords).arrowheads({ frequency: '50px' });</code></pre>`,
		{ maxWidth: 2000, minWidth: 450 }
	);

var path6 = L.polyline([path6points], { smoothFactor: 1.5, weight: 2 })
	.arrowheads({ size: '15px', frequency: '50px' })
	.bindPopup(
		`<pre><code>L.polyline(coords)
  .arrowheads({ 
    size: '15px', 
    frequency: '50px' 
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

// Offset paths
var path7 = L.polyline([path7points], {
	smoothFactor: 1.5,
	weight: 2,
	color: 'darkblue',
})
	.arrowheads({
		size: '300m',
		frequency: 20,
		offsets: { end: '15px' },
	})
	.bindPopup(
		`<pre><code>L.polyline(coords)
  .arrowheads({ 
    size: '300m', 
    frequency: 20, 
    offsets: { 
      end: '15px' 
    } 
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var path8 = L.polyline([path8points[0], path8points[path8points.length - 1]], {
	smoothFactor: 1.5,
	weight: 2,
	color: 'darkblue',
})
	.arrowheads({
		frequency: 'endonly',
		size: '30px',
		offsets: { end: '15px' },
	})
	.bindPopup(
		`<pre><code>L.polyline(coords)
  .arrowheads({ 
    size: '30px', 
    frequency: 'endonly', 
    offsets: { 
      end: '15px' 
    } 
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

L.marker(path7points[path7points.length - 1], {
	icon: boatIcon,
	draggable: true,
}).addTo(map);
L.marker(path8points[path8points.length - 1], {
	icon: boatIcon,
	draggable: true,
}).addTo(map);

var path9 = L.polyline(path9points, {
	smoothFactor: 1.5,
	weight: 2,
	color: 'darkblue',
})
	.arrowheads({
		frequency: '1000m',
		size: '300m',
		offsets: { start: '5000m', end: '10px' },
	})
	.bindPopup(
		`<pre><code>L.polyline(coords)
  .arrowheads({ 
    size: '300m', 
    frequency: '1000m', 
    offsets: { 
      start: '5000m', 
      end: '10px' 
    } 
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var group3 = L.layerGroup([path1, path2, path3, path4, path5, path6]);
var group4 = L.layerGroup([path7, path8, path9]);

group3.addTo(map);
group4.addTo(map);

//  ------- GROUP 1: Arrowhead Color, Fill, and Yawn Options --------------//

var bigVector0 = L.polyline(
	[
		[59.85688529423247, 10.491943359375],
		[59.94985301711567, 10.817413330078125],
	],
	{ color: 'black', stroke: '2' }
).arrowheads({ fill: false, yawn: 30 });

var bigVector1 = L.polyline(
	[
		[58.401711667608, 5.6689453125],
		[60.261617082844616, 10.8544921875],
	],
	{ color: 'blue', weight: 2 }
).arrowheads({ fill: false, yawn: 30 });

var bigVector2 = L.polyline(
	[
		[47.57652571374621, -27.333984375],
		[61.227957176677876, 10.810546875],
	],
	{ color: 'purple', weight: '2' }
).arrowheads({ size: '20px', fill: false, yawn: 30 });

var bigVector3 = L.polyline(
	[
		[31.203404950917395, -84.0234375],
		[62.34960927573042, 10.8984375],
	],
	{ color: 'black', weight: '2' }
)
	.arrowheads({
		size: '20px',
		fill: true,
		yawn: 30,
		frequency: 20,
		perArrowheadOptions: (i) => ({
			color: `rgba(150, 20, ${0 + 20 * i}, 1)`,
		}),
	})
	.bindPopup(
		`<pre><code class="hljs language-javascript">L.polyline(coords)
  .arrowheads({ 
    size: '20px',
    fill: true,
    yawn: 30,
    frequency: 20,
    perArrowheadOptions: (i) => ({
      color: \`rgba(150, 20, \${0 + 20 * i}, 1)\`,
    }),
  });</code></pre>`,
		{ maxWidth: 2000, minWidth: 400 }
	);

var groupBig = L.layerGroup([bigVector0, bigVector1, bigVector2, bigVector3]);

groupBig.addTo(map);

const somePopup = L.marker(map.getCenter()).bindPopup(`
  <h4 onClick={flyToNorway()} class="norwayLink">To Norway!</h4>
`);

somePopup.addTo(map);

function flyToNorway() {
	map.flyTo([47.57652571374621, -27.333984375], 3, {
		animate: true,
		duration: 5,
	});

	somePopup.closePopup();
}

// GeoJSON Examples:

const samplegeojson = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'LineString',
				coordinates: [
					[-119.94323730468749, 31.487235582017444],
					[-119.92401123046875, 31.508312698943445],
					[-119.89654541015624, 31.529385064020936],
					[-119.85260009765624, 31.541089879585808],
					[-119.81689453125, 31.54577139493626],
					[-119.75372314453125, 31.548112064557003],
					[-119.7015380859375, 31.53640812943961],
					[-119.66583251953124, 31.52470272697062],
					[-119.62188720703125, 31.508312698943445],
					[-119.5806884765625, 31.49191979634118],
					[-119.52850341796875, 31.477866449675865],
					[-119.47631835937499, 31.47083898476439],
					[-119.41589355468749, 31.47083898476439],
					[-119.34722900390625, 31.48020882071693],
					[-119.2950439453125, 31.49426181553272],
				],
			},
		},
		{
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'LineString',
				coordinates: [
					[-119.44885253906251, 31.512995857454676],
					[-119.39941406249999, 31.52470272697062],
					[-119.33624267578124, 31.53640812943961],
					[-119.278564453125, 31.5504526754715],
					[-119.22088623046875, 31.55981453201843],
					[-119.1412353515625, 31.56449510799119],
					[-119.08355712890625, 31.555133721172034],
					[-119.02862548828125, 31.53640812943961],
					[-118.98468017578125, 31.512995857454676],
					[-118.91326904296874, 31.501287521196705],
					[-118.86383056640625, 31.512995857454676],
					[-118.80889892578126, 31.53640812943961],
					[-118.75396728515625, 31.573855555238104],
					[-118.73199462890626, 31.608948861695676],
				],
			},
		},
	],
};

const geojsonExample = L.geoJSON(samplegeojson, { arrowheads: { size: '25%' } })
	.bindPopup(
		`<pre><code>L.geoJSON(sampleGeoJSON, {
  arrowheads: { 
    size: '25%' 
  } 
});</code></pre>`,
		{ minWidth: 400 }
	)
	.addTo(map);

//  ------- Layers control --------------//

L.control
	.layers(null, {
		'Vector 1': simpleVector0,
		'Vector 2': simpleVector1,
		'Vector 3': simpleVector2,
		'Vector 4': simpleVector3,
		'Vector 5': simpleVector4,
		'Vector 6': simpleVector5,
		'Group 2': group2,
		'Group 3': group3,
		GeoJSON: geojsonExample,
	})
	.addTo(map);
