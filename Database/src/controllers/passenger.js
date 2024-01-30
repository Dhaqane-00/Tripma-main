const prisma = require("../providers/ConnectDB");


exports.create = async(req, res) => {
    const {
        firstName,
        lastName,
        middleName,
        suffix,
        dateOfBirth,
        email,
        phoneNumber,
        redressNumber,
        knownTravellerNumber,
        emergencyContact,
        bags,
      } = req.body;
    try{

        const createdPassenger = await prisma.passenger.create({
            data: {
              firstName,
              lastName,
              middleName,
              suffix,
              dateOfBirth,
              email,
              phoneNumber,
              redressNumber,
              knownTravellerNumber,
              emergencyContact: {
                create: emergencyContact,
              },
              bags: {
                createMany: {
                  data: bags,
                },
              },
            },
            include: {
              emergencyContact: true,
              bags: true,
            },
          });


        return res.status(200).json({
            success:true,
            message:"Passenger created successfully",
            data:createdPassenger
        })



    }catch(e){
        return res.status(400).json({message:e.message})
    }
}
exports.getById = async (req, res) => {
  const passengerId = req.params.id;
  try {
      const passenger = await prisma.passenger.findUnique({
          where: {
              id: passengerId,
          },
          include: {
              emergencyContact: true,
              bags: true,
          },
      });
      if (!passenger) {
          return res.status(404).json({ message: 'Passenger not found' });
      }
      return res.status(200).json({
          success: true,
          data: passenger,
      });
  } catch (e) {
      return res.status(500).json({ message: e.message });
  }
};


exports.getAll = async (req, res) => {
  try {
      const passengers = await prisma.passenger.findMany({
          include: {
              emergencyContact: true,
              bags: true,
          },
      });
      return res.status(200).json({
          success: true,
          data: passengers,
      });
  } catch (e) {
      return res.status(500).json({ message: e.message });
  }
};


exports.updateById = async (req, res) => {
  const passengerId = req.params.id;
  const {
      firstName,
      lastName,
      middleName,
      suffix,
      dateOfBirth,
      email,
      phoneNumber,
      redressNumber,
      knownTravellerNumber,
      emergencyContact,
      bags,
  } = req.body;
  try {
      const updatedPassenger = await prisma.passenger.update({
          where: {
              id: passengerId,
          },
          data: {
              firstName,
              lastName,
              middleName,
              suffix,
              dateOfBirth,
              email,
              phoneNumber,
              redressNumber,
              knownTravellerNumber,
              emergencyContact: {
                  update: emergencyContact,
              },
              bags: {
                  updateMany: {
                      data: bags,
                  },
              },
          },
          include: {
              emergencyContact: true,
              bags: true,
          },
      });
      return res.status(200).json({
          success: true,
          message: 'Passenger updated successfully',
          data: updatedPassenger,
      });
  } catch (e) {
      return res.status(400).json({ message: e.message });
  }
};


exports.deleteById = async (req, res) => {
  const passengerId = req.params.id;
  try {
      const deletedPassenger = await prisma.passenger.delete({
          where: {
              id: passengerId,
          },
          include: {
              emergencyContact: true,
              bags: true,
          },
      });
      return res.status(200).json({
          success: true,
          message: 'Passenger deleted successfully',
          data: deletedPassenger,
      });
  } catch (e) {
      return res.status(500).json({ message: e.message });
  }
};

