const express = require("express");
const { create } = require("../controllers/passenger");
const Passenger = express.Router();

Passenger.post("/create",create);

module.exports = Passenger