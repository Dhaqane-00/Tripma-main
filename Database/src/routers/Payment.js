const express  = require('express');
const Payment = express.Router();
const {create, update, getAll, getById} = require("../controllers/payment");


Payment.post('/create', create);
Payment.put("/update", update);
Payment.get('/get', getAll);
Payment.get('/getByID/:id', getById);

module.exports = Payment


