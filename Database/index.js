const express = require('express')
const Router = require("./src/routers/router")
const Flight = require("./src/routers/Flight")
const Cores = require("cors")
const Trip = require('./src/routers/Trip')
const Passenger = require('./src/routers/passenger')
const Payment = require('./src/routers/Payment')
const app = express()
const port = 3000;
app.use(express.json());
app.use(Cores())

app.use("/owners",Router);
app.use("/flight",Flight);
app.use("/trip",Trip);
app.use("/passenger",Passenger);
app.use("/Payment",Payment);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})