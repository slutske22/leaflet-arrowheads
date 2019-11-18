function modulus(i, n){
   return (i % n + n) % n;
}


L.Polyline.include({

   vectorhat: function(options = {
      filledIn: false,
      yawn: 60,
   } ){

      let bearing = L.GeometryUtil.bearing(this._latlngs[0], this._latlngs[1]);
      let leftWingPoint = L.GeometryUtil.destination(this._latlngs[1], bearing - 180 - options.yawn/2, 10)
      let rightWingPoint = L.GeometryUtil.destination(this._latlngs[1], bearing - 180 + options.yawn/2, 10)

      let vectorhat;

      if (!options.filledIn){
         vectorhat = L.polyline([
            [leftWingPoint.lat, leftWingPoint.lng],
            [this._latlngs[1].lat, this._latlngs[1].lng],
            [rightWingPoint.lat, rightWingPoint.lng]
         ], this.options)
      } else if (options.filledIn){
         vectorhat = L.polygon([
            [leftWingPoint.lat, leftWingPoint.lng],
            [this._latlngs[1].lat, this._latlngs[1].lng],
            [rightWingPoint.lat, rightWingPoint.lng]
         ], {
            stroke: false,
            fill: true,
            fillColor: this.options.color,
            fillOpacity: 1.0
         })
      }

      this._vectorhat = vectorhat;

      return this

   },





   vectorhats: function(options ={
      filledIn: false,
      yawn: 60,
      size: 20,
      frequency: true,
      continous: false
   }){
      this.hatsApplied = true;
      this.vectorhatOptions = options;
      return this;
   },

   buildVectorHats: function( options ={
      filledIn: false,
      yawn: 60,
      size: 20,
      frequency: true,
      continous: false
   }){

      if (this._vectorhats){
         this._vectorhats.remove()
         let vectorhats = []
         let allhats = []
      }

      let allhats = [];
      this._parts.forEach( (peice, index) => {

         console.log('Peice number', index);
         let latlngs = peice.map( point => {
            return this._map.layerPointToLatLng(point);
         })
         console.log('peice', peice);
         console.log('latlngs', latlngs);

         let hats = []
         for (var i = 1; i < peice.length; i++) {

            let bearing = L.GeometryUtil.bearing(
               latlngs[ modulus( (i-1), latlngs.length ) ], latlngs[i]
            )

            let leftWingPoint =
               L.GeometryUtil.destination(latlngs[i], bearing - 180 - options.yawn/2, options.size)

            let rightWingPoint =
               L.GeometryUtil.destination(latlngs[i], bearing - 180 + options.yawn/2, options.size)

            let hat = L.polyline([
               [leftWingPoint.lat, leftWingPoint.lng],
               [latlngs[i].lat, latlngs[i].lng],
               [rightWingPoint.lat, rightWingPoint.lng]
            ], {smoothFactor: 1})

            hats.push(hat)

         } // for loop

         allhats.push(...hats);

      }) // forEach peice

      let vectorhats = L.layerGroup(allhats)
      this._vectorhats = vectorhats;

      return this

   },



   getVectorhat: function(){
      if (this._vectorhat){
         return this._vectorhat;
      } else {
         return console.log(`You tried to call '.getVectorhat() on a shape that does not have a vectorhat.  Use '.vectorhat()' to add a vectorhat before trying to call '.getVectorhat()'`);
      }
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
         this.buildVectorHats()
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
         this.buildVectorHats();
         map.addLayer(this._vectorhats);
      }
	},

   _updatePath: function () {
		this._renderer._updatePoly(this);


	},

   // @method remove: this
   // Removes the layer from the map it is currently active on.
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
