# leaflet-vectorhats
 Leaflet-Vecotrhats is a small plugin for leaflet to quickly draw vector hats on polylines for vector visualization.

<p align="center">
  <img src="images/banner.PNG" width="80%">
</p>

## Installation

TODO: You can use npm to install leaflet-arrowheads:

`npm install -leaflet-arrowheads`

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
myVector.getVectorhats().remove() // removes vectorhats from map
````

Vectorhats can also be deleted from their parent polyline entirely:

````
myVector.deleteHats()

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
            <li> A string value which is a number with a percent sign <i>( '15%', '20%', '25%', etc. )</i> will render arrows whose size is that percentage of the size of the parent polyline.  If the polyline has multiple segments, 'size' will take the percent of the average size of the segments. </li>
            <li> A string value which is a number with the suffix 'px' <i>( '20px', '25px', '30px', etc. )</i> will render an arrowhead whose size stays at a constant pixel value, regardless of zoom level.  Will look strange at low zoom levels or for smaller parent vectors.  Ideal for larger parent vectors and at higher zoom levels. </li>
         </ul>
      </td>
   </tr>

   <tr>
      <td> frequency </td>
      <td> Number | String <br>
      <i> ( Number of vectorhats | Meters, Pixels, 'allvertices', 'endonly' ) </i> </td>
      <td> 'allvertices' </td>
      <td> How many vectorhats are rendered on a polyline.  
         <ul>
            <li> 'allvertices' renders a hat on each vertex. </li>
            <li> 'endonly' renders only one at the end.</li>
            <li> A number value renders that number of vectorhats evenly spaces across the polyline.  </li>
            <li>  A string value with suffix 'm' (i.e. <code>'100m'</code>) will render vectorhats spaced evenly along the polyline with roughly that many meters between each one.  </li>
            <li>A string value with suffix 'px' (i.e. <code>'30px'</code>) will render vectorhats spaced evenly with roughly that many pixels between each, regardless of zoom level.</li>
         </ul>
      </td>
   </tr>

   <tr>
      <td> proportionalToTotal </td>
      <td> Boolean </td>
      <td> false </td>
      <td> Only relevant when <code>size</code> is given as a percent. Useful when <code>frequency</code> is set to <code>'endonly'</code>.  Will render the vectorhat(s) with a size proportional to the entire length of the multi-segmented polyline, rather than proportional to the average length of all the segments.</td>
   </tr>

</table>


## Examples

<table>
   <tr>
      <td colspan="4"><b>Yawn Options</td>
   </tr>
   <tr>
      <td width="35%">
         <pre>L.polyline.vectorhats()</pre>
         (Standard option gives 60 degree yawn)
      </td>
      <td>
         <img src="images/yawn-1.PNG" width="100px">
      </td>
      <td width="35%">
         <pre>L.polyline.vectorhats({ 
  yawn: 90
})</pre>
      </td>
      <td>
         <img src="images/yawn-2.PNG" width="100px">
      </td>
   </tr>
   <tr>
      <td><pre>L.polyline.vectorhats({ 
  yawn: 40 
})</pre></td>
      <td><img src="images/yawn-3.PNG" width="100px"></td>
      <td><pre>.vectorhats({
  yawn: 40, 
  fill: true 
})</pre></td>
      <td><img src="images/yawn-4.PNG" width="100px"></td>
   </tr>
</table>

<table>
   <tr>
      <td colspan="4"><b>Color and Fill Options</td>
   </tr>
   <tr>
      <td width="35%">
         <pre>L.polyline.vectorhats()</pre><br>
         (Standard options makes vectorhats a vector with same color as parent)
      </td>
      <td>
         <img src="images/color-1.PNG" width="100px">
      </td>
      <td width="35%">
         <pre>L.polyline.vectorhats({ 
  fill: true
})</pre>
      </td>
      <td>
         <img src="images/fill-1.PNG" width="100px">
      </td>
   </tr>
   <tr>
      <td><pre>L.polyline.vectorhats({ 
  color: 'black' 
})</pre></td>
      <td><img src="images/color-2.PNG" width="100px"></td>
      <td><pre>L.polyline([coords],{
  color: 'black'
})
    .vectorhats({ 
       fill: true 
    })</pre></td>
      <td><img src="images/fill-2.PNG" width="100px"></td>
   </tr>
   <tr>
      <td><pre>L.polyline.vectorhats({ 
  color: 'black' 
})</pre></td>
      <td><img src="images/fill-3.PNG" width="100px"></td>
      <td><pre>L.polyline.vectorhats({ 
  fill: true,
  color: 'black'
  fillColor: 'green' 
})</pre></td>
      <td><img src="images/color-3.PNG" width="100px"></td>
   </tr>
</table>


<table>
   <tr><td><b>Frequency Options</b></td></tr>
   <tr><td>
      <code>L.polyline([coords]).vectorhats( {frequency: 20} ) // 20 vectorhats evenly distributed</code><br>
      <br>
      <img src="images/frequency-1.PNG">
   </td></tr>
   <tr><td>
      <code>L.polyline([coords]).vectorhats( {frequency: '500m'} ) // vectorhats every ~500 m evenly distributed</code><br>
      <br>
      <img src="images/frequency-2.PNG">
   </td></tr>
   <tr><td>    
      <code>L.polyline([coords]).vectorhats( {frequency: '50px', size: '12px'} ) // vectorhats every 50px regardless of zoom</code><br>
      <br>
      <img src="images/frequency-3.gif" width="100%">
   </td></tr>
   <tr><td>    
      <code>L.polyline([coords]).vectorhats( {frequency: 'allvertices'} )  // standard option</code><br>
      <br>
      <img src="images/frequency-4.gif" width="100%">
   </td></tr>
</table>


https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links
.
