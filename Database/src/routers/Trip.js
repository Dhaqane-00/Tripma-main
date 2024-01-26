const express = require('express');
const Trip = express.Router();
const {search, getAllsearch, Updatesearch, deleteTrip, getTrip} = require("../controllers/Trip");


Trip.post("/search",search);
Trip.get("/GetAllsearch",getAllsearch);
Trip.get("/getTrip/:id",getTrip);
Trip.put("/Updatesearch/:id",Updatesearch);
Trip.delete("/DeleteTrip/:id",deleteTrip);


module.exports = Trip;