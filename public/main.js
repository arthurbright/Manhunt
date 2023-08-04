//

var x = document.getElementById("textbox");
var x2 = document.getElementById("textbox2");
var namebox = document.getElementById("namebox");

var dummyLat = 43.8915;
var dummyLong = -79.40246;

var lat = 0;
var lon = 0;

var numUpdates = 0;

var hunted = false;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, errorout);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function errorout(error){
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }
    
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    /*
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude + 
    "<br>Altitude: " + position.coords.altitude + 
    "<br>Heading: " + position.coords.heading + 
    "<br>Updates: " + numUpdates;*/
    numUpdates += 1;
}

////////////////////////////////////////////
getLocation();
setInterval(() => {
    updateText()
}, 2000);

async function updateText(){
    const url = "/huntee";
    var data = await axios.get(url, {});
    if(data.data.name == '') data.data.name = "Unnamed User";

    x2.innerHTML = "Distance to " + data.data.name + ": " + getDistanceFromLatLonInKm(data.data.lat, data.data.lon, lat, lon) + " km";
}


function huntMe(){
    const url = "/huntme";
    const data = {lat: lat, lon: lon, name: namebox.value}
    axios.post(url, data);
}








///////////////////////////////////////////////////////////////////////////////////util
//https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6378.1370; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}