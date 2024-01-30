const prisma = require("../providers/ConnectDB");

// Create a new payment
exports.create = async (req, res) => {
    try {
      const { name, number, date, ccv } = req.body;
      const newPayment = await prisma.payment.create({
        data: {
          name,
          number,
          date,
          ccv,
        },
      });
      res.status(201).json(newPayment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get all payments
  exports.getAll = async (req, res) => {
    try {
      const payments = await prisma.payment.findMany();
      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get a specific payment by ID
  exports.getById = async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await prisma.payment.findUnique({
        where: { id: parseInt(id) },
      });
      if (!payment) {
        res.status(404).json({ error: 'Payment not found' });
      } else {
        res.status(200).json(payment);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update an existing payment by ID
  exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, number, date, ccv } = req.body;
      const updatedPayment = await prisma.payment.update({
        where: { id: parseInt(id) },
        data: { name, number, date, ccv },
      });
      res.status(200).json(updatedPayment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };