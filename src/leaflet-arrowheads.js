function modulus(i, n) {
   return ((i % n) + n) % n;
}

L.Polyline.include({
   arrowheads: function (options = {}) {
      // Merge user input options with default options:
      const defaults = {
         yawn: 60,
         size: '15%',
         frequency: 'allvertices',
         proportionalToTotal: false,
      };

      this.options.noClip = true;

      let actualOptions = Object.assign({}, defaults, options);
      this._arrowheadOptions = actualOptions;

      this._hatsApplied = true;
      return this;
   },

   buildVectorHats: function (options) {
      // Reset variables from previous this._update()
      if (this._arrowheads) {
         this._arrowheads.remove();
      }

      //  -------------------------------------------------------- //
      //  ------------  FILTER THE OPTIONS ----------------------- //
      /*
       * The next 3 lines folds the options of the parent polyline into the default options for all polylines
       * The options for the arrowhead are then folded in as well
       * All options defined in parent polyline will be inherited by the arrowhead, unless otherwise specified in the arrowhead(options) call
       */

      let defaultOptionsOfParent = Object.getPrototypeOf(
         Object.getPrototypeOf(this.options)
      );

      // merge default options of parent polyline (this.options's prototype's prototype) with options passed to parent polyline (this.options).
      let parentOptions = Object.assign(
         {},
         defaultOptionsOfParent,
         this.options
      );

      // now merge in the options the user has put in the arrowhead call
      let hatOptions = Object.assign({}, parentOptions, options);

      // ...with a few exceptions:
      hatOptions.smoothFactor = 1;
      hatOptions.fillOpacity = 1;
      hatOptions.fill = options.fill ? true : false;
      hatOptions.interactive = false;

      //  ------------  FILTER THE OPTIONS END -------------------- //
      //  --------------------------------------------------------- //

      //  --------------------------------------------------------- //
      //  ------ LOOP THROUGH EACH POLYLINE SEGMENT --------------- //
      //  ------ TO CALCULATE HAT SIZES AND CAPTURE IN ARRAY ------ //

      let size = options.size.toString(); // stringify if its a number
      let allhats = []; // empty array to receive hat polylines
      const { frequency } = options;

      this._parts.forEach((peice, index) => {
         // Immutable variables for each peice
         const latlngs = peice.map((point) =>
            this._map.layerPointToLatLng(point)
         );

         const totalLength = (() => {
            let total = 0;
            for (var i = 0; i < peice.length - 1; i++) {
               total += this._map.distance(latlngs[i], latlngs[i + 1]);
            }
            return total;
         })();

         // TBD by options if tree below
         let derivedLatLngs;
         let derivedBearings;
         let spacing;
         let noOfPoints;

         //  Determining latlng and bearing arrays based on frequency choice:
         if (!isNaN(frequency)) {
            spacing = 1 / frequency;
            noOfPoints = frequency;
         } else if (
            frequency
               .toString()
               .slice(
                  frequency.toString().length - 1,
                  frequency.toString().length
               ) === '%'
         ) {
            console.log(
               'Error: arrowhead frequency option cannot be given in percent.  Try another unit.'
            );
         } else if (
            frequency
               .toString()
               .slice(
                  frequency.toString().length - 1,
                  frequency.toString().length
               ) === 'm'
         ) {
            spacing = frequency.slice(0, frequency.length - 1) / totalLength;
            noOfPoints = 1 / spacing;
            // round things out for more even spacing:
            noOfPoints = Math.floor(noOfPoints);
            spacing = 1 / noOfPoints;
         } else if (
            frequency
               .toString()
               .slice(
                  frequency.toString().length - 2,
                  frequency.toString().length
               ) === 'px'
         ) {
            spacing = (() => {
               let chosenFrequency = frequency.slice(0, frequency.length - 2);
               let refPoint1 = this._map.getCenter();
               let xy1 = this._map.latLngToLayerPoint(refPoint1);
               let xy2 = {
                  x: xy1.x + Number(chosenFrequency),
                  y: xy1.y,
               };
               let refPoint2 = this._map.layerPointToLatLng(xy2);
               let derivedMeters = this._map.distance(refPoint1, refPoint2);
               return derivedMeters / totalLength;
            })();

            noOfPoints = 1 / spacing;

            // round things out for more even spacing:
            noOfPoints = Math.floor(noOfPoints);
            spacing = 1 / noOfPoints;
         }

         if (options.frequency === 'allvertices') {
            derivedBearings = (() => {
               let bearings = [];
               for (var i = 1; i < latlngs.length; i++) {
                  let bearing =
                     L.GeometryUtil.angle(
                        this._map,
                        latlngs[modulus(i - 1, latlngs.length)],
                        latlngs[i]
                     ) + 180;
                  bearings.push(bearing);
               }
               return bearings;
            })();

            derivedLatLngs = latlngs;
            derivedLatLngs.shift();
         } else if (options.frequency === 'endonly') {
            derivedLatLngs = [latlngs[latlngs.length - 1]];

            derivedBearings = [
               L.GeometryUtil.angle(
                  this._map,
                  latlngs[latlngs.length - 2],
                  latlngs[latlngs.length - 1]
               ) + 180,
            ];
         } else {
            derivedLatLngs = [];
            let interpolatedPoints = [];
            for (var i = 0; i < noOfPoints; i++) {
               let interpolatedPoint = L.GeometryUtil.interpolateOnLine(
                  this._map,
                  latlngs,
                  spacing * (i + 1)
               );

               interpolatedPoints.push(interpolatedPoint);
               derivedLatLngs.push(interpolatedPoint.latLng);
            }

            derivedBearings = (() => {
               let bearings = [];

               for (var i = 0; i < interpolatedPoints.length; i++) {
                  let bearing = L.GeometryUtil.angle(
                     this._map,
                     latlngs[interpolatedPoints[i].predecessor + 1],
                     latlngs[interpolatedPoints[i].predecessor]
                  );
                  bearings.push(bearing);
               }
               return bearings;
            })();
         }

         let n = latlngs.length - 1;
         let hats = [];

         // Function to build hats based on index and a given hatsize in meters
         const pushHats = (size) => {
            let leftWingPoint = L.GeometryUtil.destination(
               derivedLatLngs[i],
               derivedBearings[i] - options.yawn / 2,
               size
            );

            let rightWingPoint = L.GeometryUtil.destination(
               derivedLatLngs[i],
               derivedBearings[i] + options.yawn / 2,
               size
            );

            let hatPoints = [
               [leftWingPoint.lat, leftWingPoint.lng],
               [derivedLatLngs[i].lat, derivedLatLngs[i].lng],
               [rightWingPoint.lat, rightWingPoint.lng],
            ];

            let hat = options.fill
               ? L.polygon(hatPoints, hatOptions)
               : L.polyline(hatPoints, hatOptions);

            hats.push(hat);
         }; // pushHats()

         // Function to build hats based on pixel input
         const pushHatsFromPixels = (size) => {
            let sizePixels = size.slice(0, size.length - 2);

            let derivedXY = this._map.latLngToLayerPoint(derivedLatLngs[i]);

            let bearing = derivedBearings[i];

            let thetaLeft =
                  (180 - bearing - options.yawn / 2) * (Math.PI / 180),
               thetaRight =
                  (180 - bearing + options.yawn / 2) * (Math.PI / 180);

            let dxLeft = sizePixels * Math.sin(thetaLeft),
               dyLeft = sizePixels * Math.cos(thetaLeft),
               dxRight = sizePixels * Math.sin(thetaRight),
               dyRight = sizePixels * Math.cos(thetaRight);

            let leftWingXY = {
               x: derivedXY.x + dxLeft,
               y: derivedXY.y + dyLeft,
            };
            let rightWingXY = {
               x: derivedXY.x + dxRight,
               y: derivedXY.y + dyRight,
            };

            let leftWingPoint = this._map.layerPointToLatLng(leftWingXY),
               rightWingPoint = this._map.layerPointToLatLng(rightWingXY);

            let hatPoints = [
               [leftWingPoint.lat, leftWingPoint.lng],
               [derivedLatLngs[i].lat, derivedLatLngs[i].lng],
               [rightWingPoint.lat, rightWingPoint.lng],
            ];

            let hat = options.fill
               ? L.polygon(hatPoints, hatOptions)
               : L.polyline(hatPoints, hatOptions);

            hats.push(hat);
         }; // pushHatsFromPixels()

         //  -------  LOOP THROUGH POINTS IN EACH SEGMENT ---------- //
         for (var i = 0; i < derivedLatLngs.length; i++) {
            // ---- If size is chosen in meters -------------------------
            if (size.slice(size.length - 1, size.length) === 'm') {
               let hatSize = size.slice(0, size.length - 1);
               pushHats(hatSize);

               // ---- If size is chosen in percent ------------------------
            } else if (size.slice(size.length - 1, size.length) === '%') {
               let sizePercent = size.slice(0, size.length - 1);
               let hatSize = (() => {
                  if (
                     options.frequency === 'endonly' &&
                     options.proportionalToTotal
                  ) {
                     return (totalLength * sizePercent) / 100;
                  } else {
                     let averageDistance = totalLength / (peice.length - 1);
                     return (averageDistance * sizePercent) / 100;
                  }
               })(); // hatsize calculation

               pushHats(hatSize);

               // ---- If size is chosen in pixels --------------------------
            } else if (size.slice(size.length - 2, size.length) === 'px') {
               pushHatsFromPixels(options.size);

               // ---- If size unit is not given -----------------------------
            } else {
               console.log(
                  'Error: Arrowhead size unit not defined.  Check your arrowhead options.'
               );
            } // if else block for Size
         } // for loop for each point witin a peice

         allhats.push(...hats);
      }); // forEach peice

      //  --------- LOOP THROUGH EACH POLYLINE END ---------------- //
      //  --------------------------------------------------------- //

      let arrowheads = L.layerGroup(allhats);
      this._arrowheads = arrowheads;

      return this;
   },

   getArrowheads: function () {
      if (this._arrowheads) {
         return this._arrowheads;
      } else {
         return console.log(
            `Error: You tried to call '.getArrowheads() on a shape that does not have a arrowhead.  Use '.arrowheads()' to add a arrowheads before trying to call '.getArrowheads()'`
         );
      }
   },

   deleteArrowheads: function () {
      if (this._arrowheads) {
         this._arrowheads.remove();
         delete this._arrowheads;
         delete this._arrowheadOptions;
         this._hatsApplied = false;
      }
   },

   addTo: function (map) {
      map.addLayer(this);
      if (this._hatsApplied) {
         this.buildVectorHats(this._arrowheadOptions);
         this._arrowheads.addTo(this._map);
      }
      return this;
   },

   _update: function () {
      if (!this._map) {
         return;
      }

      this._clipPoints();
      this._simplifyPoints();
      this._updatePath();

      if (this._hatsApplied) {
         this.buildVectorHats(this._arrowheadOptions);
         this._map.addLayer(this._arrowheads);
      }
   },

   remove: function () {
      if (this._arrowheads) {
         this._arrowheads.remove();
      }
      return this.removeFrom(this._map || this._mapToAdd);
   },
});

L.LayerGroup.include({
   removeLayer: function (layer) {
      var id = layer in this._layers ? layer : this.getLayerId(layer);

      if (this._map && this._layers[id]) {
         if (this._layers[id]._arrowheads) {
            this._layers[id]._arrowheads.remove();
         }
         this._map.removeLayer(this._layers[id]);
      }

      delete this._layers[id];

      return this;
   },

   onRemove: function (map, layer) {
      for (var layer in this._layers) {
         if (this._layers[layer]) {
            this._layers[layer].remove();
         }
      }

      this.eachLayer(map.removeLayer, map);
   },
});

L.Map.include({
   removeLayer: function (layer) {
      var id = L.Util.stamp(layer);

      if (layer._arrowheads) {
         layer._arrowheads.remove();
      }

      if (!this._layers[id]) {
         return this;
      }

      if (this._loaded) {
         layer.onRemove(this);
      }

      if (layer.getAttribution && this.attributionControl) {
         this.attributionControl.removeAttribution(layer.getAttribution());
      }

      delete this._layers[id];

      if (this._loaded) {
         this.fire('layerremove', { layer: layer });
         layer.fire('remove');
      }

      layer._map = layer._mapToAdd = null;

      return this;
   },
});

L.GeoJSON.include({
   geometryToLayer: function (geojson, options) {
      var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
         coords = geometry ? geometry.coordinates : null,
         layers = [],
         pointToLayer = options && options.pointToLayer,
         _coordsToLatLng =
            (options && options.coordsToLatLng) || L.GeoJSON.coordsToLatLng,
         latlng,
         latlngs,
         i,
         len;

      if (!coords && !geometry) {
         return null;
      }

      switch (geometry.type) {
         case 'Point':
            latlng = _coordsToLatLng(coords);
            return this._pointToLayer(pointToLayer, geojson, latlng, options);

         case 'MultiPoint':
            for (i = 0, len = coords.length; i < len; i++) {
               latlng = _coordsToLatLng(coords[i]);
               layers.push(
                  this._pointToLayer(pointToLayer, geojson, latlng, options)
               );
            }
            return new L.FeatureGroup(layers);

         case 'LineString':
         case 'MultiLineString':
            latlngs = L.GeoJSON.coordsToLatLngs(
               coords,
               geometry.type === 'LineString' ? 0 : 1,
               _coordsToLatLng
            );
            var polyline = new L.Polyline(latlngs, options);
            if (options.arrowheads) {
               polyline.arrowheads(options.arrowheads);
            }
            return polyline;

         case 'Polygon':
         case 'MultiPolygon':
            latlngs = L.GeoJSON.coordsToLatLngs(
               coords,
               geometry.type === 'Polygon' ? 1 : 2,
               _coordsToLatLng
            );
            return new L.Polygon(latlngs, options);

         case 'GeometryCollection':
            for (i = 0, len = geometry.geometries.length; i < len; i++) {
               var layer = this.geometryToLayer(
                  {
                     geometry: geometry.geometries[i],
                     type: 'Feature',
                     properties: geojson.properties,
                  },
                  options
               );

               if (layer) {
                  layers.push(layer);
               }
            }
            return new L.FeatureGroup(layers);

         default:
            throw new Error('Invalid GeoJSON object.');
      }
   },

   addData: function (geojson) {
      var features = L.Util.isArray(geojson) ? geojson : geojson.features,
         i,
         len,
         feature;

      if (features) {
         for (i = 0, len = features.length; i < len; i++) {
            // only add this if geometry or geometries are set and not null
            feature = features[i];
            if (
               feature.geometries ||
               feature.geometry ||
               feature.features ||
               feature.coordinates
            ) {
               this.addData(feature);
            }
         }
         return this;
      }

      var options = this.options;

      if (options.filter && !options.filter(geojson)) {
         return this;
      }

      var layer = this.geometryToLayer(geojson, options);
      if (!layer) {
         return this;
      }
      layer.feature = L.GeoJSON.asFeature(geojson);

      layer.defaultOptions = layer.options;
      this.resetStyle(layer);

      if (options.onEachFeature) {
         options.onEachFeature(geojson, layer);
      }

      return this.addLayer(layer);
   },

   _pointToLayer: function (pointToLayerFn, geojson, latlng, options) {
      return pointToLayerFn
         ? pointToLayerFn(geojson, latlng)
         : new L.Marker(
              latlng,
              options && options.markersInheritOptions && options
           );
   },
});
