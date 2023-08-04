var x = document.getElementById("textbox");

var numUpdates = 0;

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
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude + 
    "<br>Altitude: " + position.coords.altitude + 
    "<br>Heading: " + position.coords.heading + 
    "<br>Updates: " + numUpdates;
}