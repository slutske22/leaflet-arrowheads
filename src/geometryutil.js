import { CRS, LatLng, Point } from 'leaflet';

/* Extracted from leaflet.geometryutil */
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

export {angle, destination};