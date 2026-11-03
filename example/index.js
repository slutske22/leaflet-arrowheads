import { Map, TileLayer, Icon, LayerGroup, Marker, Control } from 'leaflet';
import { arrow, Arrow } from '../src';

const map = new Map('mapID').setView([32.02556114475524, -119.78169059753418], 9);

map.on('popupopen', () => {
	hljs.highlightAll();
});

new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);

const boatIcon = new Icon({
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

const simpleVector0 = new Arrow(
        [
            [
                map.getCenter().lat - 0.05 + group1Offsetx,
                map.getCenter().lng - group1Offsety - 0.25,
            ],
            [
                map.getCenter().lat + 0.05 + group1Offsetx,
                map.getCenter().lng - group1Offsety - 0.25 + 0.05,
            ],
            [
                map.getCenter().lat + 0.05 + group1Offsetx + 0.05,
                map.getCenter().lng - group1Offsety - 0.25 + 0.05 + 0.05,
            ],
        ],
        { color: 'black', headFill: true }
);


const simpleVector1 = new Arrow(
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
);


const simpleVector2 = new Arrow(
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
);

const simpleVector3 = new Arrow(
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
);

const simpleVector4 = new Arrow(
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
	{ color: 'orange', weight: 2, yawn: 40 }
);

const simpleVector5 = new Arrow(
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
        { color: 'red', headFill: true }
);

const group1 = new LayerGroup([
    simpleVector0,
    simpleVector1,
    simpleVector2,
    simpleVector3,
    simpleVector4,
    simpleVector5,
]);

group1.addTo(map);

//  ------- GROUP 2: Arrowhead Size Options------------------------//

const group2offsetx = 0.6;
const group2offsety = 0.05;

const multiVector1 = new Arrow(
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
        { smoothFactor: 30 },
);

var multiVector2 = new Arrow(
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
);

const multiVector3 = new Arrow(
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
        { smoothFactor: 30, color: 'purple' },
);

const multiVector4 = new Arrow(
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
        { smoothFactor: 30, color: 'green', headFill: true, yawn: 30 },
);

const multiVector5 = new Arrow(
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
        { smoothFactor: 30, color: 'darkred', headFill: true, yawn: 30 },
);

const group2 = new LayerGroup([
    multiVector1,
    multiVector2,
    multiVector3,
    multiVector4,
    multiVector5,
]);

group2.addTo(map);

//  ------- GROUP 3: Arrowhead frequency options --------------------//

const malibuPathPoints = [
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

const group3offsetx = 0.2,
	group3offsety = -0.1;

const path1points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 1.8, point[1] + group3offsetx - 1.7];
});

const path2points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 1.85, point[1] + group3offsetx - 1.7];
});

const path3points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 1.9, point[1] + group3offsetx - 1.7];
});

const path4points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 1.95, point[1] + group3offsetx - 1.7];
});

const path5points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 2, point[1] + group3offsetx - 1.7];
});

const path6points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 2.05, point[1] + group3offsetx - 1.7];
});

// Offset path points:
const path7points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 2.15, point[1] + group3offsetx - 1.7];
});

const path8points = malibuPathPoints.map((point) => {
	return [point[0] + group3offsety - 2.23, point[1] + group3offsetx - 1.7];
});

const path9points = [
	malibuPathPoints.map((point) => {
		return [point[0] + group3offsety - 2.3, point[1] + group3offsetx - 1.7];
	}),
	malibuPathPoints.map((point) => {
		return [point[0] + group3offsety - 2.275, point[1] + group3offsetx - 1.7];
	}),
];

const path1 = new Arrow([path1points], { smoothFactor: 1.5, weight: 2 });

const path2 = new Arrow([path2points], { smoothFactor: 1.5, weight: 2 });

const path3 = new Arrow([path3points], { smoothFactor: 1.5, weight: 2 });

const path4 = new Arrow([path4points], { smoothFactor: 1.5, weight: 2, color: 'darkblue' });

const path5 = new Arrow([path5points], { smoothFactor: 1.5, weight: 2 });

const path6 = new Arrow([path6points], { smoothFactor: 1.5, weight: 2 });

// Offset paths
const path7 = new Arrow([path7points], {
	smoothFactor: 1.5,
	weight: 2,
	color: 'darkblue',
});

const path8 = new Arrow([path8points[0], path8points[path8points.length - 1]], {
	smoothFactor: 1.5,
	weight: 2,
	color: 'darkblue',
});

new Marker(path7points[path7points.length - 1], {
	icon: boatIcon,
	draggable: true,
}).addTo(map);
new Marker(path8points[path8points.length - 1], {
	icon: boatIcon,
	draggable: true,
}).addTo(map);

const path9 = new Arrow(path9points, {
	smoothFactor: 1.5,
	weight: 2,
	color: 'darkblue',
});

const group3 = new LayerGroup([path1, path2, path3, path4, path5, path6]);
const group4 = new LayerGroup([path7, path8, path9]);

group3.addTo(map);
group4.addTo(map);

//  ------- GROUP 1: Arrowhead Color, Fill, and Yawn Options --------------//
const bigVector0 = new Arrow(
	[
		[59.85688529423247, 10.491943359375],
		[59.94985301711567, 10.817413330078125],
	],
	{ color: 'black', stroke: '2', yawn: 30 }
);

const bigVector1 = new Arrow(
	[
		[58.401711667608, 5.6689453125],
		[60.261617082844616, 10.8544921875],
	],
	{ color: 'blue', weight: 2, yawn: 30 }
);

const bigVector2 = new Arrow(
	[
		[47.57652571374621, -27.333984375],
		[61.227957176677876, 10.810546875],
	],
	{ color: 'purple', weight: '2', yawn: 30 }
);

const bigVector3 = new Arrow(
	[
		[31.203404950917395, -84.0234375],
		[62.34960927573042, 10.8984375],
	],
	{ color: 'black', weight: '2', yawn: 30 }
);

const groupBig = new LayerGroup([bigVector0, bigVector1, bigVector2, bigVector3]);

groupBig.addTo(map);

const somePopup = new Marker(map.getCenter()).bindPopup(`
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

//  ------- Layers control --------------//

new Control
	.layers(null, {
		'Vector 1': simpleVector0,
		'Vector 2': simpleVector1,
		'Vector 3': simpleVector2,
		'Vector 4': simpleVector3,
		'Vector 5': simpleVector4,
		'Vector 6': simpleVector5,
		'Group 2': group2,
		'Group 3': group3
    })
	.addTo(map);