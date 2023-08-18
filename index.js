const express = require('express')
const path = require('path')

//initialize app + socket
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.json());

////////////////////////////////////////////////////////////////////////////
///                            SOCKET
///////////////////////////////////////////////////////////////////////////
io.on('connection', socket =>{
  players.set(socket.id, new Player(socket.id));

  //on disconnect
  socket.on('disconnect', function () {
    players.delete(socket.id);
  });

  socket.on('updatePlayer', ({lat, lon, name, huntee})=>{
    updatePlayer(socket.id, lat, lon, name, huntee)
  });
});

//send huntee data
const interval = 1000;
setInterval(() => {
  const huntees = [];
  players.forEach(player =>{
    if(player.huntee){
      huntees.push({
        id: player.id,
        lat: player.lat,
        lon: player.lon,
        name: player.name,
        lastUpdate: player.lastUpdate
      });
    }
  });
  io.emit("hunteeData", huntees);
}, interval);


////////////////////////////////////////////////////////////////////////
//                           FUNCTIONALITY
///////////////////////////////////////////////////////////////////////

const players = new Map();

class Player {
  constructor(id) {
    this.id = id;
    this.huntee = false;
    this.lon = 0.0;
    this.lat = 0.0;
    this.name = "Unnamed player";
    this.lastUpdate = Date.now();
  }
}

function setHuntee(id, bool){
  if(players.has(id)){
    players.get(id).huntee = bool;
  }
}

function updatePlayer(id, lat, lon, name, huntee){
  if(name == ""){
    name = "Unnamed player";
  }
  if(players.has(id)){
    const player = players.get(id);
    player.lon = lon;
    player.lat = lat;
    player.name = name;
    player.huntee = huntee;
    player.lastUpdate = Date.now();
  }
}



//////////////////////////////////////////////////////////////////////////
//                           OLD ENDPOINTS
////////////////////////////////////////////////////////////////////////

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
  //console.log(req.body);
  hunteeLat = req.body.lat;
  hunteeLon = req.body.lon;
  hunteeName = req.body.name;
  res.status(200);
});


///////////////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Manhunt listening on port ${port}`);
})