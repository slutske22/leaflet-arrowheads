function modulus(i, n){
   return (i % n + n) % n;
}


L.Polyline.include({

   vectorhats: function(options = {}){

      // Merge user input options with default options:
      const defaults = {
         yawn: 60,
         size: '15%',
         proportionalToRemainder: false,
         endOnly: false,
         proportionalToTotal: false,
      }
      let actualOptions = Object.assign({}, defaults, options)
      this._vectorhatOptions = actualOptions;

      this.hatsApplied = true;
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





      let size = options.size.toString(); // stringify if its a number
      let allhats = []; // empty array to receive hat polylines

      //  --------------------------------------------------------- //
      //  ------ LOOP THROUGH EACH POLYLINE SEGMENT --------------- //
      //  ------ TO CALCULATE HAT SIZES AND CAPTURE IN ARRAY ------ //
      this._parts.forEach( (peice, index) => {

         // Preliminary defintions:
         let latlngs = peice.map( point => this._map.layerPointToLatLng(point));
         let n = latlngs.length - 1
         let hats = [];

         // Function to build hats based on index and a given hatsize in meters
         const pushHats = (i, size) => {
            let bearing = L.GeometryUtil.bearing(
               latlngs[ modulus( (i-1), latlngs.length ) ], latlngs[i]
            )

            let leftWingPoint =
               L.GeometryUtil.destination(latlngs[i], bearing - 180 - options.yawn/2, size)

            let rightWingPoint =
               L.GeometryUtil.destination(latlngs[i], bearing - 180 + options.yawn/2, size)

            let hatPoints = [
                  [leftWingPoint.lat, leftWingPoint.lng],
                  [latlngs[i].lat, latlngs[i].lng],
                  [rightWingPoint.lat, rightWingPoint.lng]
               ]

            let hat = options.fill
               ? L.polygon(hatPoints, hatOptions)
               : L.polyline(hatPoints, hatOptions)

            hats.push(hat)
         } // pushHats()


         // Function to build hats based on pixel input
         const pushHatsFromPixels = (i, size) => {

            let sizePixels = size.slice(0, size.length-2)

            let bearing = L.GeometryUtil.bearing(
               latlngs[ modulus( (i-1), latlngs.length ) ], latlngs[i]
            )

            let thetaLeft = (360-bearing - options.yawn/2) * (Math.PI / 180),
               thetaRight = (360-bearing + options.yawn/2) * (Math.PI / 180)

            let dxLeft = sizePixels * Math.sin(thetaLeft),
               dyLeft = sizePixels * Math.cos(thetaLeft),
               dxRight =sizePixels * Math.sin(thetaRight),
               dyRight =sizePixels * Math.cos(thetaRight)

            let leftWingXY = {
               x: peice[i].x + dxLeft,
               y: peice[i].y + dyLeft
            }
            let rightWingXY = {
               x: peice[i].x + dxRight,
               y: peice[i].y + dyRight
            }

            let leftWingPoint = this._map.layerPointToLatLng(leftWingXY),
               rightWingPoint = this._map.layerPointToLatLng(rightWingXY)

            let hatPoints = [
                  [leftWingPoint.lat, leftWingPoint.lng],
                  [latlngs[i].lat, latlngs[i].lng],
                  [rightWingPoint.lat, rightWingPoint.lng]
               ]

            let hat = options.fill
               ? L.polygon(hatPoints, hatOptions)
               : L.polyline(hatPoints, hatOptions)

            hats.push(hat)

         } // pushHatsFromPixels()


         //  -------  LOOP THROUGH POINTS IN EACH SEGMENT ---------- //
         for (var i = 1; i < peice.length; i++) {

            let totalLength = ( () => {
               let total = 0;
               for (var i = 0; i < peice.length-1; i++) {
                  total += this._map.distance(latlngs[i], latlngs[i+1])
               }
               return total;
            })();

            // -----------------------------------------------------------
            //              If size is given in percent
            // -----------------------------------------------------------
            if (size.slice(size.length-1, size.length) === '%' ){

               if (!options.proportionalToRemainder){
                  this.options.noClip = true;
               }

               let sizePercent = size.slice(0, size.length-1)
               let hatSize = ( () => {

                  if (options.endOnly && options.proportionalToTotal){
                     return totalLength * sizePercent / 100;
                  } else {
                     let averageDistance = ( totalLength / (peice.length-1) )
                     return averageDistance * sizePercent / 100
                  }

               })() // hatsize calculation



               if (options.endOnly){
                  pushHats(n, hatSize)
               } else {
                  pushHats(i, hatSize)
               }

            // -----------------------------------------------------------
            //                If size is given in pixels
            // -----------------------------------------------------------
            } else if ( size.slice(size.length-2, size.length) === 'px' ){

               if (options.endOnly){
                  pushHatsFromPixels(n, options.size)
               } else {
                  pushHatsFromPixels(i, options.size)
               }


            // -----------------------------------------------------------
            //       If size is given in meters (as a unitless number)
            // -----------------------------------------------------------
            } else {

               if (options.endOnly){
                  pushHats(n, options.size)
               } else {
                  pushHats(i, options.size)
               }

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

      if (this._map && this._layers[id]) {
         if (this._layers[id]._vectorhats){
            this._layers[id]._vectorhats.remove() ;
         }
			this._map.removeLayer(this._layers[id]);
		}

      delete this._vectorhats

      this.hatsApplied = false
   },


   addTo: function (map) {
      map.addLayer(this);
      if (this._vectorhat){
         map.addLayer(this._vectorhat);
      }
      if (this.hatsApplied){
         this.buildVectorHats(this._vectorhatOptions)
         map.addLayer(this._vectorhats);
      }
      return this;
   },


   _update: function () {
		if (!this._map) { return; }

      this._clipPoints();
		this._simplifyPoints();
		this._updatePath();


      if (this.hatsApplied){
         this.buildVectorHats(this._vectorhatOptions);
         map.addLayer(this._vectorhats);
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
