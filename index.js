const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'));
app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/main.html'));
});

var hunteeLat = 0;
var hunteeLon = 0;
var hunteeName = "Gulf of Guinea (lat lon 0 0)";

app.get('/huntee', function(req, res) {
  var obj = {lat: hunteeLat, lon: hunteeLon, name: hunteeName};
  res.send(obj);
});

app.post('/huntme', function(req, res) {
  console.log(req.body);
  hunteeLat = req.body.lat;
  hunteeLon = req.body.lon;
  hunteeName = req.body.name;
  res.status(200);
});



const port = process.eventNames.PORT || 3000;

app.listen(port, () => {
  console.log(`Manhunt listening on port ${port}`);
})