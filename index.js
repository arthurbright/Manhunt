const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("hi");
})

app.listen(process.eventNames.PORT || 3000, () => {
  console.log(`Manhunt listening on port ${port}`)
})