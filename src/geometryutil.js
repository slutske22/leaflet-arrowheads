import { CRS, LatLng, Point, Polyline } from 'leaflet';

/* Extracted from leaflet.geometryutil */

/**
 Returns the coordinate of the point located on a line at the specified ratio of the line length.
 @param {Map} map Leaflet map to be used for this method
 @param {Array<LatLng>|Polyline} latlngs Set of geographical points
 @param {Number} ratio the length ratio, expressed as a decimal between 0 and 1, inclusive
 @returns {Object} an object with latLng ({LatLng}) and predecessor ({Number}), the index of the preceding vertex in the Polyline
  (-1 if the interpolated point is the first vertex)
 */
function interpolateOnLine(map, latLngs, ratio) {
    latLngs = (latLngs instanceof Polyline) ? latLngs.getLatLngs() : latLngs;
    var n = latLngs.length;
    if (n < 2) {
        return null;
    }

    // ensure the ratio is between 0 and 1;
    ratio = Math.max(Math.min(ratio, 1), 0);

    if (ratio === 0) {
        return {
            latLng: latLngs[0] instanceof LatLng ? latLngs[0] : new LatLng(latLngs[0]),
            predecessor: -1
        };
    }
    if (ratio == 1) {
        return {
            latLng: latLngs[latLngs.length -1] instanceof LatLng ? latLngs[latLngs.length -1] : new LatLng(latLngs[latLngs.length -1]),
            predecessor: latLngs.length - 2
        };
    }

    // project the LatLngs as Points,
    // and compute total planar length of the line at max precision
    var maxzoom = map.getMaxZoom();
    if (maxzoom === Infinity)
        maxzoom = map.getZoom();
    var pts = [];
    var lineLength = 0;
    for(var i = 0; i < n; i++) {
        pts[i] = map.project(latLngs[i], maxzoom);
        if(i > 0)
            lineLength += pts[i-1].distanceTo(pts[i]);
    }

    var ratioDist = lineLength * ratio;

    // follow the line segments [ab], adding lengths,
    // until we find the segment where the points should lie on
    var cumulativeDistanceToA = 0, cumulativeDistanceToB = 0;
    for (var i = 0; cumulativeDistanceToB < ratioDist; i++) {
        var pointA = pts[i], pointB = pts[i+1];

        cumulativeDistanceToA = cumulativeDistanceToB;
        cumulativeDistanceToB += pointA.distanceTo(pointB);
    }

    if (pointA == undefined && pointB == undefined) { // Happens when line has no length
        var pointA = pts[0], pointB = pts[1];
        i = 1;
    }

    // compute the ratio relative to the segment [ab]
    var segmentRatio = ((cumulativeDistanceToB - cumulativeDistanceToA) !== 0) ? ((ratioDist - cumulativeDistanceToA) / (cumulativeDistanceToB - cumulativeDistanceToA)) : 0;
    var interpolatedPoint = new Point((pointA.x * (1 - segmentRatio)) + (segmentRatio * pointB.x),
            (pointA.y * (1 - segmentRatio)) + (segmentRatio * pointB.y));
    return {
        latLng: map.unproject(interpolatedPoint, maxzoom),
        predecessor: i-1
    };
}

/**
 Returns horizontal angle in degres between two points.
 @param {Point} a Coordinates of point A
 @param {Point} b Coordinates of point B
 @returns {Number} horizontal angle
 */
function angle(map, latlngA, latlngB) {
    var pointA = map.latLngToContainerPoint(latlngA),
            pointB = map.latLngToContainerPoint(latlngB),
            angleDeg = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180 / Math.PI + 90;
    angleDeg += angleDeg < 0 ? 360 : 0;
    return angleDeg;
}

/**
 Returns the point that is a distance and heading away from
 the given origin point.
 @param {LatLng} latlng: origin point
 @param {float} heading: heading in degrees, clockwise from 0 degrees north.
 @param {float} distance: distance in meters
 @returns {LatLng} the destination point.
  Many thanks to Chris Veness at http://www.movable-type.co.uk/scripts/latlong.html
  for a great reference and examples.
 */
function destination(latlng, heading, distance) {
    heading = (heading + 360) % 360;
    var rad = Math.PI / 180,
            radInv = 180 / Math.PI,
            R = CRS.Earth.R, // approximation of Earth's radius
            lon1 = latlng.lng * rad,
            lat1 = latlng.lat * rad,
            rheading = heading * rad,
            sinLat1 = Math.sin(lat1),
            cosLat1 = Math.cos(lat1),
            cosDistR = Math.cos(distance / R),
            sinDistR = Math.sin(distance / R),
            lat2 = Math.asin(sinLat1 * cosDistR + cosLat1 *
                    sinDistR * Math.cos(rheading)),
            lon2 = lon1 + Math.atan2(Math.sin(rheading) * sinDistR *
                    cosLat1, cosDistR - sinLat1 * Math.sin(lat2));
    lon2 = lon2 * radInv;
    lon2 = lon2 > 180 ? lon2 - 360 : lon2 < -180 ? lon2 + 360 : lon2;
    return new LatLng([lat2 * radInv, lon2]);
}

export {angle, destination, interpolateOnLine};