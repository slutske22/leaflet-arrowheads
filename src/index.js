import {
    LayerGroup,
    Map,
    Polygon,
    Polyline,
    Util,
} from 'leaflet';
import { angle, destination } from './geometryutil.js';

function modulus(i, n) {
    return ((i % n) + n) % n;
}
let Arrow = Polyline.extend({
    options: {
        yawn: 40,
        headFill: false
    },

    initialize(latlngs, options, legacyOptions) {
        Polyline.prototype.initialize.call(this, latlngs, options, legacyOptions);
        this.options.noClip = true;
        this._hatsApplied = true;
    },

    buildVectorHats() {
        // Reset variables from previous this._update()
        if (this._arrowheads) {
            this._arrowheads.remove();
        }

        let defaultOptionsOfParent = Object.getPrototypeOf(
                Object.getPrototypeOf(this.options)
        );
        // merge default options of parent polyline (this.options' prototype's prototype) with options passed to parent polyline (this.options).
        let hatOptions = Object.assign({}, defaultOptionsOfParent, this.options);
        // ...with a few exceptions:
        hatOptions.smoothFactor = 1;
        hatOptions.fillOpacity = 1;
        // Can't use fill directly as it would try to fill the Polyline.
        hatOptions.fill = this.options.headFill;
        hatOptions.interactive = false;

        let allHats = []; // empty array to receive hat polylines

        const lineToTrace = this;

        lineToTrace._parts.forEach(part => {
            const latlngs = part.map((point) => this._map.layerPointToLatLng(point));
            let derivedBearings = (() => {
                let bearings = [];
                for (let i = 1; i < latlngs.length; i++) {
                    let bearing =
                            angle(
                                    this._map,
                                    latlngs[modulus(i - 1, latlngs.length)],
                                    latlngs[i]
                            ) + 180;
                    bearings.push(bearing);
                }
                return bearings;
            })();

            /* derivedLatLngs contains the coordinate of the tip of each segment of the arrows */
            const derivedLatLngs = latlngs;
            derivedLatLngs.shift();

            /* Try to get a visually similar size depending on zoom level */
            const hatSize = 2457600 / Math.pow(2, this._map.getZoom());

            /* Trace the arrow heads */
            let hats = [];
            for (let i = 0; i < derivedLatLngs.length; i++) {
                let yawn = hatOptions.yawn ?? this.options.yawn;
                let leftWingPoint = destination(
                        derivedLatLngs[i],
                        derivedBearings[i] - yawn / 2,
                        hatSize
                );
                let rightWingPoint = destination(
                        derivedLatLngs[i],
                        derivedBearings[i] + yawn / 2,
                        hatSize
                );
                let hatPoints = [
                    [leftWingPoint.lat, leftWingPoint.lng],
                    [derivedLatLngs[i].lat, derivedLatLngs[i].lng],
                    [rightWingPoint.lat, rightWingPoint.lng],
                ];
                let hat = this.options.headFill
                        ? new Polygon(hatPoints, { ...hatOptions })
                        : new Polyline(hatPoints, { ...hatOptions });
                hats.push(hat);
            }
            allHats.push(...hats);
        });
        this._arrowheads = new LayerGroup(allHats);
        return this;
    },

    _update() {
        if (!this._map) {
            return;
        }
        this._clipPoints();
        this._simplifyPoints();
        this._updatePath();
        if (this._hatsApplied) {
            this.buildVectorHats();
            this._map.addLayer(this._arrowheads);
        }
    },

    remove() {
        if (this._arrowheads) {
            this._arrowheads.remove();
        }
        return this.removeFrom(this._map || this._mapToAdd);
    },
});

LayerGroup.include({
    removeLayer(layer) {
        const id = layer in this._layers ? layer : this.getLayerId(layer);
        if (this._map && this._layers[id]) {
            if (this._layers[id]._arrowheads) {
                this._layers[id]._arrowheads.remove();
            }
            this._map.removeLayer(this._layers[id]);
        }
        delete this._layers[id];
        return this;
    },

    onRemove(map, layer) {
        for (let layer in this._layers) {
            if (this._layers[layer]) {
                this._layers[layer].remove();
            }
        }
        this.eachLayer(map.removeLayer, map);
    },
});

let arrow = function(latlngs, options) {
    return new Arrow(latlngs, options);
}

Map.include({
    removeLayer(layer) {
        const id = Util.stamp(layer);

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

export { Arrow, arrow };