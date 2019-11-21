# leaflet-vectorhats
 Leaflet-Vecotrhats is a small plugin for leaflet to quickly draw vector hats on polylines for vector visualization.

<p align="center">
  <img src="images/banner.PNG" width="80%">
</p>

## Installation

## Usage

Vectorhats can be applied to any polyline, whether unisegmental, multisegmental, continuous, or discontinuous:

````
var myVector = L.polyline([ coords ]).vectorhats()
````

Vectorhats will be added to your polyline and will automatically be added to and removed from the map when you call add and remove methods on your polyline:

````
myVector.addTo(map) or myVector.remove()
````

If you need to access the vectorhats directly, you can call the `.getVectorhats()` method on your polyline.

````
myVector.getVectorhats() // returns the vectorhats polyline object
myVector.getVectorhats().remove() // removes vectorhat from parent polyline
````

Vectorhats can take a configuration object as its argument:

````
var myVector = L.polyline([ coords ]).vectorhats({ <Options> })
````


## Options

Vectorhats offers a variety of options for rendering and styling vectorhats.  See the options table below.<br>
<br>
Vectorhats inherit all options from [L.Path](https://leafletjs.com/reference-1.6.0.html#path).  Vectorhats also inherit all options from their parent polylines, except `fill`, `fillOpacity`, and `smoothFactor`.  These can be changed manually when defining the vectorhats' options, but changing smoothFactor will result in improperly rendered arrows.<br>
<br>
<table>

   <tr>
      <td> <b> Option </b> </td>
      <td> <b> Type </b> </td>
      <td> <b> Default </b> </td>
      <td> <b> Description </b> </td>
   </tr>

   <tr>
      <td> yawn </td>
      <td> Number <i color="grey"> ( Degrees ) </i> </td>
      <td> 40 </td>
      <td>  Defines the width of the opening of the vectorhat, given in degrees.  The larger the angle, the wider the arrowhead. </td>
   </tr>

   <tr>
      <td> size </td>
      <td width="25%"> Number | String <br>
      <i> ( Meters | Percent or Pixels ) </i> </td>
      <td> '15%' </td>
      <td> Determines the size of the arrowhead.  Accepts three types of values: <br>
         <ul>
            <li> A number will set the size of the vectorhat to that number of meters </li>
            <li> A string value which is a number with a percent sign <i>( '15%', '20%', '25%', etc. )</i> will render arrows whose size is that percentage of the size of the parent polyline.  If the polyline has multiple segments and <code>endOnly</code> is set to false, arrows will be rendered at each vertex, with a size that is 'size' percent of the average size of the segments. </li>
            <li> A string value which is a number with the suffix 'px' <i>( '20px', '25px', '30px', etc. )</i> will render an arrowhead whose size stays at a constant pixel value, regardless of zoom level.  Will look strange at low zoom levels or for smaller parent vectors.  Ideal for larger parent vectors and at higher zoom levels. </li>
         </ul>
      </td>
   </tr>

   <tr>
      <td> proportionalToRemainder </td>
      <td> Boolean </td>
      <td> false </td>
      <td> Only relevant when <code>size</code> is given as a percent.  Will automatically scale the arrowhead to the percent size of the portion of the vector that is within the map bounds.  At high zoom levels, behaves like giving size in pixels.</td>
   </tr>

   <tr>
      <td> endOnly </td>
      <td> Boolean </td>
      <td> false </td>
      <td> When applying vectorhats to multi-segment polylines, every vertex will render a vectorhat except the first.  When <code>endOnly</code> is set to true, only the last vertex will show a vectorhat. </td>
   </tr>

   <tr>
      <td> proportionalToTotal </td>
      <td> Boolean </td>
      <td> false </td>
      <td> Only relevant when <code>size</code> is given as a percent, and when <code>endOnly</code> is set to true.  Will render the vectorhat at the end of the polyline with a size proportional to the entire length of the multi-segmented polyline, rather than proportional to the average length of all the segments.</td>
   </tr>

</table>


## Examples




https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links
.
