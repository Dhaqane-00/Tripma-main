const express = require("express");
const { create, getAll, updateById, getById } = require("../controllers/passenger");
const Passenger = express.Router();

Passenger.post("/create",create);
Passenger.get("/GetAll",getAll);
Passenger.get("/GetById",getById);
Passenger.put("/Update/:id",updateById);


module.exports = Passenger