import GeometryUtil from './leaflet.geometryutil.js'


function modulus(i, n){
   return (i % n + n) % n;
}


export default L.Polyline.include({

   vectorhats: function(options = {}){

      // Merge user input options with default options:
      const defaults = {
         yawn: 60,
         size: '15%',
         frequency: 'allvertices',
         endOnly: false,
         proportionalToTotal: false,
      }

      this.options.noClip = true;

      let actualOptions = Object.assign({}, defaults, options)
      this._vectorhatOptions = actualOptions;

      this._hatsApplied = true;
      return this;
   },

   buildVectorHats: function( options ){

      // Reset variables from previous this._update()
      if (this._vectorhats){
         this._vectorhats.remove()
         let vectorhats = []
         let allhats = []
      }

      //  -------------------------------------------------------- //
      //  ------------  FILTER THE OPTIONS ----------------------- //
      /*
         * The next 3 lines folds the options of the parent polyline into the default options for all polylines
         * The options for the vectorhat are then folded in as well
         * All options defined in parent polyline will be inherited by the vectorhat, unless otherwise specified in the vectorhat(options) call
      */


      let defaultOptionsOfParent = Object.getPrototypeOf(Object.getPrototypeOf(this.options))

      // merge default options of parent polyline (this.options's prototype's prototype) with options passed to parent polyline (this.options).
      let parentOptions = Object.assign({}, defaultOptionsOfParent, this.options)

      // now merge in the options the user has put in the vectorhat call
      let hatOptions = Object.assign({}, parentOptions, options)

      // ...with a few exceptions:
      hatOptions.smoothFactor = 1;
      hatOptions.fillOpacity = 1
      hatOptions.fill = options.fill ? true : false

      //  ------------  FILTER THE OPTIONS END -------------------- //
      //  --------------------------------------------------------- //





      //  --------------------------------------------------------- //
      //  ------ LOOP THROUGH EACH POLYLINE SEGMENT --------------- //
      //  ------ TO CALCULATE HAT SIZES AND CAPTURE IN ARRAY ------ //

      let size = options.size.toString(); // stringify if its a number
      let allhats = []; // empty array to receive hat polylines
      const { frequency } = options;


      this._parts.forEach( (peice, index) => {

         // Immutable variables for each peice
         const latlngs = peice.map( point => this._map.layerPointToLatLng(point));

         const totalLength = ( () => {
            let total = 0;
            for (var i = 0; i < peice.length-1; i++) {
               total += this._map.distance(latlngs[i], latlngs[i+1])
            }
            return total;
         })();


         // TBD by options if tree below
         let derivedLatLngs;
         let derivedBearings;
         let spacing;
         let noOfPoints;


         //  Determining latlng and bearing arrays based on frequency choice:
         if ( !isNaN(frequency) ) {

            spacing = 1 / frequency;
            noOfPoints = frequency;

         } else if ( frequency.toString().slice( frequency.toString().length - 1, frequency.toString().length ) === '%' ){

            console.log('frequency in %');

         } else if ( frequency.toString().slice( frequency.toString().length - 1, frequency.toString().length ) === 'm' ){

            console.log('frequency in meters');
            spacing = frequency.slice(0,frequency.length-1) / totalLength;
            noOfPoints = 1 / spacing
            // round things out for more even spacing:
            noOfPoints = Math.floor(noOfPoints)
            spacing = 1 / noOfPoints

         } else if ( frequency.toString().slice( frequency.toString().length - 2, frequency.toString().length ) === 'px' ){

            spacing = ( () => {

               let chosenFrequency = frequency.slice(0,frequency.length-2)
               let refPoint1 = this._map.getCenter()
               let xy1 = this._map.latLngToLayerPoint( refPoint1 )
               let xy2 = {
                  x: xy1.x + Number(chosenFrequency),
                  y: xy1.y
               }
               let refPoint2 = this._map.layerPointToLatLng( xy2 )
               let derivedMeters = this._map.distance(refPoint1, refPoint2)
               return derivedMeters / totalLength;
            })()

            noOfPoints = 1 / spacing

            // round things out for more even spacing:
            noOfPoints = Math.floor(noOfPoints)
            spacing = 1 / noOfPoints

            console.log('noOfPoints', noOfPoints);
            console.log('spacing', spacing);


         }


         if (options.frequency === 'allvertices'){

            derivedBearings = ( () => {
               let bearings = [];
               for (var i = 1; i < latlngs.length; i++) {
                  let bearing = L.GeometryUtil.bearing(
                     latlngs[ modulus( (i-1), latlngs.length ) ], latlngs[i]
                  ) + 180
                  bearings.push(bearing)
               }
               return bearings;
            })()

            derivedLatLngs = latlngs
            derivedLatLngs.shift()

            // console.log('derivedLatLngs', derivedLatLngs);
            // console.log('derivedBearings', derivedBearings);

         } else if (options.frequency === 'endonly') {

            console.log('end only');

            derivedLatLngs = [
               latlngs[latlngs.length - 1]
            ];

            derivedBearings = [
               L.GeometryUtil.bearing(
                  latlngs[latlngs.length - 2], latlngs[latlngs.length - 1]
               ) + 180
            ];

            // console.log('derivedLatLngs', derivedLatLngs);
            // console.log('derivedBearings', derivedBearings);


         } else {

            derivedLatLngs = []
            let interpolatedPoints = []
            for (var i = 0; i < noOfPoints; i++) {

               let interpolatedPoint = L.GeometryUtil.interpolateOnLine(
                  this._map, latlngs, spacing * (i + 1)
               )

               interpolatedPoints.push(interpolatedPoint)
               derivedLatLngs.push(interpolatedPoint.latLng)

            }

            derivedBearings = ( () => {
               let bearings = [];

               // bearings.push(
               //    L.GeometryUtil.bearing(
               //      interpolatedPoints[0].latLng, latlngs[0]
               //   )
               // )

               for (var i = 0; i < interpolatedPoints.length; i++) {
                  let bearing = L.GeometryUtil.bearing(
                     interpolatedPoints[i].latLng, latlngs[ interpolatedPoints[i].predecessor ]
                  )
                  bearings.push(bearing)
               }
               return bearings;
            })()

            // console.log('derivedLatLngs', derivedLatLngs);
            // console.log('derivedBearings', derivedBearings);


         }

         // derivedLatLngs.forEach( point => {
         //    L.circle([point.lat, point.lng], {color:'black'}).addTo(this._map)
         // })


         let n = latlngs.length - 1
         let hats = [];



         // Function to build hats based on index and a given hatsize in meters
         const pushHats = (size) => {

            let leftWingPoint =
               L.GeometryUtil.destination(derivedLatLngs[i], derivedBearings[i] - options.yawn/2, size)

            let rightWingPoint =
               L.GeometryUtil.destination(derivedLatLngs[i], derivedBearings[i] + options.yawn/2, size)

            let hatPoints = [
                  [leftWingPoint.lat, leftWingPoint.lng],
                  [derivedLatLngs[i].lat, derivedLatLngs[i].lng],
                  [rightWingPoint.lat, rightWingPoint.lng]
               ]

            let hat = options.fill
               ? L.polygon(hatPoints, hatOptions)
               : L.polyline(hatPoints, hatOptions)

            hats.push(hat)

         } // pushHats()


         // Function to build hats based on pixel input
         const pushHatsFromPixels = (size) => {

            let sizePixels = size.slice(0, size.length-2)

            let derivedXY = this._map.latLngToLayerPoint(derivedLatLngs[i])

            let bearing = derivedBearings[i]

            let thetaLeft = (180 - bearing - options.yawn/2) * (Math.PI / 180),
               thetaRight = (180 -bearing + options.yawn/2) * (Math.PI / 180)

            let dxLeft = sizePixels * Math.sin(thetaLeft),
               dyLeft = sizePixels * Math.cos(thetaLeft),
               dxRight =sizePixels * Math.sin(thetaRight),
               dyRight =sizePixels * Math.cos(thetaRight)

            let leftWingXY = {
               x: derivedXY.x + dxLeft,
               y: derivedXY.y + dyLeft
            }
            let rightWingXY = {
               x: derivedXY.x + dxRight,
               y: derivedXY.y + dyRight
            }

            let leftWingPoint = this._map.layerPointToLatLng(leftWingXY),
               rightWingPoint = this._map.layerPointToLatLng(rightWingXY)

            let hatPoints = [
                  [leftWingPoint.lat, leftWingPoint.lng],
                  [derivedLatLngs[i].lat, derivedLatLngs[i].lng],
                  [rightWingPoint.lat, rightWingPoint.lng]
               ]

            let hat = options.fill
               ? L.polygon(hatPoints, hatOptions)
               : L.polyline(hatPoints, hatOptions)

            hats.push(hat)

         } // pushHatsFromPixels()


         //  -------  LOOP THROUGH POINTS IN EACH SEGMENT ---------- //
         for (var i = 0; i < derivedLatLngs.length; i++) {

            // ---- If size is chosen in meters -------------------------
            if (size.slice(size.length-1, size.length) === 'm' ){

               let hatSize = size.slice(0, size.length-1)
               pushHats(hatSize)

            // ---- If size is chosen in percent ------------------------
            } else if (size.slice(size.length-1, size.length) === '%' ){

               let sizePercent = size.slice(0, size.length-1)
               let hatSize = ( () => {
                  if (options.frequency === 'endonly' && options.proportionalToTotal){
                     return totalLength * sizePercent / 100;
                  } else {
                     let averageDistance = ( totalLength / (peice.length-1) )
                     return averageDistance * sizePercent / 100
                  }
               })() // hatsize calculation

               pushHats( hatSize );

            // ---- If size is chosen in pixels --------------------------
            } else if ( size.slice(size.length-2, size.length) === 'px' ){

               pushHatsFromPixels(options.size)

            // ---- If size unit is not given -----------------------------
            } else {

               console.log(
                  'Error: Vectorhat size unit not defined.  Check your vectorhat options.'
               )

            }  // if else block for Size


         } // for loop for each point witin a peice

         allhats.push(...hats);

      }) // forEach peice

      //  --------- LOOP THROUGH EACH POLYLINE END ---------------- //
      //  --------------------------------------------------------- //


      let vectorhats = L.layerGroup(allhats)
      this._vectorhats = vectorhats;

      return this

   },


   getVectorhats: function(){
      if (this._vectorhats){
         return this._vectorhats;
      } else {
         return console.log(`Error: You tried to call '.getVectorhats() on a shape that does not have a vectorhat.  Use '.vectorhats()' to add a vectorhats before trying to call '.getVectorhats()'`);
      }
   },

   deleteHats: function(){

      if (this._vectorhats){
         this._vectorhats.remove()
         delete this._vectorhats;
         delete this._vectorhatOptions;
         this._hatsApplied = false;
      }


   },


   addTo: function (map) {
      map.addLayer(this);
      if (this._vectorhat){
         map.addLayer(this._vectorhat);
      }
      if (this._hatsApplied){
         this.buildVectorHats(this._vectorhatOptions);
         map.addLayer(this._vectorhats);
      }
      return this;
   },


   _update: function () {
		if (!this._map) { return; }

      this._clipPoints();
		this._simplifyPoints();
		this._updatePath();


      if (this._hatsApplied){
         this.buildVectorHats(this._vectorhatOptions);
         this._map.addLayer(this._vectorhats);
      }
	},


   remove: function () {

      if (this._vectorhats){
         this._vectorhats.removeFrom(this._map || this._mapToAdd);
         this._vectorhats = []
      }
      return this.removeFrom(this._map || this._mapToAdd);
   },


})



L.LayerGroup.include({

   removeLayer: function (layer) {
		var id = layer in this._layers ? layer : this.getLayerId(layer);

		if (this._map && this._layers[id]) {
         if (this._layers[id]._vectorhats){
            this._layers[id]._vectorhats.remove() ;
         }
			this._map.removeLayer(this._layers[id]);
		}

		delete this._layers[id];

		return this;
	},


   onRemove: function (map, layer) {

      for (var layer in this._layers) {
         if (this._layers[layer]){
            this._layers[layer].remove()
         }
      }

      this.eachLayer(map.removeLayer, map);

   },


})
