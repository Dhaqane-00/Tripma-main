const express  = require('express');
const { Create,Update,FindAll ,FindId,DeleteFlight} = require('../controllers/Flight');

const Flight = express.Router();


Flight.post('/create',Create)
Flight.get('/findAll',FindAll)
Flight.delete("/delete/:id",DeleteFlight)
Flight.get('/findAll/:id',FindId)
Flight.put('/update/:id', Update);


module.exports = Flight;