function modulus(i, n){
   return (i % n + n) % n;
}


L.Polyline.include({

   vectorhats: function(options = {}){

      // Merge user input options with default options:
      const defaults = {
         yawn: 60,
         size: 2000,
         frequency: true,
         lineCap: 'butt'
      }
      let actualOptions = Object.assign({}, defaults, options)
      this._vectorhatOptions = actualOptions;

      this.hatsApplied = true;
      return this;
   },

   buildVectorHats: function( options ){

      // Reset variables from before this._update()
      if (this._vectorhats){
         this._vectorhats.remove()
         let vectorhats = []
         let allhats = []
      }

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





      let size = options.size.toString(); // stringify if its a number
      let allhats = []; // empty array to receive hat polylines

      //  --------- LOOP THROUGH EACH POLYLINE SEGMENT ------------ //
      this._parts.forEach( (peice, index) => {

         let latlngs = peice.map( point => this._map.layerPointToLatLng(point));
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

            let hat = L.polyline([
                  [leftWingPoint.lat, leftWingPoint.lng],
                  [latlngs[i].lat, latlngs[i].lng],
                  [rightWingPoint.lat, rightWingPoint.lng]
               ], hatOptions) // let hat = L.polyline

            hats.push(hat)
         }

         //  -------  LOOP THROUGH EACH POINT IN A SEGMENT ---------- //
         for (var i = 1; i < peice.length; i++) {

            //  ------------  DETERMINE UNIT OF SIZE ---------------- //
            //  If size is given in percent:
            if (size.slice(size.length-1, size.length) === '%' ){

               let sizeNumber = size.slice(0, size.length-1)

               let hatSize = ( () => {
                  let total = 0;
                  for (var i = 1; i < peice.length; i++) {
                     let distance = this._map.distance(latlngs[ modulus( (i-1), latlngs.length ) ], latlngs[i] )
                     total += distance;
                  }
                  let averageDistance = ( total / (peice.length-1) )
                  let hatSize = averageDistance * sizeNumber / 100
                  return hatSize
               })();

               pushHats(i, hatSize)

            // If size is given in pixels
            } else if ( size.slice(size.length-2, size.length) === 'px' ){

               let sizeNumber = size.slice(0, size.length-2)

               let bearing = L.GeometryUtil.bearing(
                  latlngs[ modulus( (i-1), latlngs.length ) ], latlngs[i]
               )

               let leftWingXY = ( () => {
                  let thetaLeft = (bearing - options.yawn/2) * (Math.PI / 180)
                  let thetaRight = (bearing + options.yawn/2) * (Math.PI / 180)
                  let dxLeft = peice[i].x * Math.sin(thetaLeft)
                  let dyLeft = peice[i].y * Math.cos(thetaLeft)
                  let dxRight =peice[i].x * Math.sin(thetaRight)
                  let dyRight =peice[i].y * Math.cos(thetaRight)
                  console.log('dyRight', dyRight);
               })()
               console.log('size is as a pixel')

            // If size is given in meters (as a unitless number)
            } else {

               pushHats(i, options.size)

            }  // if else block for Size








         } // for loop

         allhats.push(...hats);

      }) // forEach peice

      let vectorhats = L.layerGroup(allhats)
      this._vectorhats = vectorhats;

      return this

   },


   getVectorhats: function(){
      if (this._vectorhats){
         return this._vectorhats;
      } else {
         return console.log(`You tried to call '.getVectorhats() on a shape that does not have a vectorhat.  Use '.vectorhats()' to add a vectorhats before trying to call '.getVectorhats()'`);
      }
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
      if (this._vectorhat){
         this._vectorhat.removeFrom(this._map || this._mapToAdd);
      }
      if (this._vectorhats){
         this._vectorhats.removeFrom(this._map || this._mapToAdd);
      }
      return this.removeFrom(this._map || this._mapToAdd);
   },


})
