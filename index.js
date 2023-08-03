const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("hi");
})

const port = process.eventNames.PORT || 3000;
//ooga
app.listen(port, () => {
  console.log(`Manhunt listening on port ${port}`);
})