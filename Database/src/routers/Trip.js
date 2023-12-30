const express = require('express');
const Trip = express.Router();
const {search} = require("../controllers/Trip");


Trip.post("/search",search);


module.exports = Trip;