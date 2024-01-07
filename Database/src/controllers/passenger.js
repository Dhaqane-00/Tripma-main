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