const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/main.html'));
});

const port = process.eventNames.PORT || 3000;

app.listen(port, () => {
  console.log(`Manhunt listening on port ${port}`);
})