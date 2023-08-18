const socket = io();

var maintext = document.getElementById("maintext");
var checkbox = document.getElementById("cbox");

var dummyLat = 43.8915;
var dummyLong = -79.40246;

var lat = 0.0;
var lon = 0.0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(savePosition, errorout);
    } else {
      maintext.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function savePosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
}

function errorout(error){
    switch(error.code) {
      case error.PERMISSION_DENIED:
        maintext.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        maintext.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        maintext.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        maintext.innerHTML = "An unknown error occurred."
        break;
    }
  }

/////////////////////////////////////////////////////////////////////////////
getLocation();
setInterval(() => {
    update()
}, 1000);

async function update(){
    //send data
    socket.emit("updatePlayer", {lat: lat, lon: lon, name: namebox.value, huntee: checkbox.checked});
}

//recieve data
socket.on("hunteeData", data=>{
  let str = `Current Huntees: ${data.length}`;
  for(let i = 0; i < data.length; i ++){
    str += "<br>";
    str += `Distance to ${data[i].name}: ${Math.round(getDistanceFromLatLonInKm(lat, lon, data[i].lat, data[i].lon) * 1000)} m`;
    str += ` (${Math.round((Date.now() - data[i].lastUpdate)/1000)} s ago)`
  }

  maintext.innerHTML = str;
})

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