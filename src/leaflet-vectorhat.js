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

   vectorhats: function( options = {
      filledIn: false,
      yawn: 60,
      frequency: true,
      continous: false
   }){
      let vertices = this.getLatLngs();

      // Arrays with bearings for each point.  Skip first one, unless continuous is set true in the options.
      let hats = [];
      let bearings = [null]
      let leftWingPoints = [null]
      let rightWingPoints = [null]

      for (var i = 1; i < vertices.length; i++) {
         bearing = L.GeometryUtil.bearing(vertices[i-1], vertices[i])
         leftWingPoints.push(
            L.GeometryUtil.destination(vertices[i], bearing - 180 - options.yawn/2, 10)
         );
         rightWingPoints.push(
            L.GeometryUtil.destination(vertices[i], bearing - 180 + options.yawn/2, 10)
         );
         hats.push(
            L.polyline([
               [leftWingPoints[i].lat, leftWingPoints[i].lng],
               [vertices[i].lat, vertices[i].lng],
               [rightWingPoints[i].lat, rightWingPoints[i].lng]
            ], this.options)
         );
      }

      let vectorhats = L.layerGroup(hats)
      this._vectorhats = vectorhats;

      return this;
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
      if (this._vectorhats){
         map.addLayer(this._vectorhats);
      }
      return this;
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
