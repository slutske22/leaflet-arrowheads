import L from '../node_modules/leaflet'
import GeometryUtil from '../node_modules/leaflet-geometryutil'

L.Polyline.include({

   vectorhat: function(options = {
      filledIn: false,
      yawn: 60
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


   addTo: function (map) {
      map.addLayer(this);
      if (this._vectorhat){
         map.addLayer(this._vectorhat);
      }
      return this;
   },

   // @method remove: this
   // Removes the layer from the map it is currently active on.
   remove: function () {
      if (this._vectorhat){
         this._vectorhat.removeFrom(this._map || this._mapToAdd);
      }
      return this.removeFrom(this._map || this._mapToAdd);
   },


})
