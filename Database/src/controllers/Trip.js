const prisma = require("../providers/ConnectDB");


exports.search = async (req, res) => {
    try {
        const { departure, arrival, startDate, endDate, adult, minor } = req.body;

        // Save the trip to the database
        const trip = await prisma.trip.create({
            data: {
                departure,
                arrival,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                adult,
                minor,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Flight created successfully",
            data: trip,
        });
    } catch (error) {
        console.error('Error during search:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
exports.getAllsearch = async (req, res) => {
    try {
        const trips = await prisma.trip.findMany();
        return res.status(200).json({
            success: true,
            message: "Flight fetched successfully",
            data: trips,
        });
    } catch (error) {
        console.error('Error during getsearch:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
exports.getTrip = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Bad Request',
                message: 'Trip ID Not Found.',
            });
        }

        const Trip = await prisma.trip.findUnique({
            where: {
                id:Number(id)
            }
        })
        return res.status(200).json({
            success: true,
            message: "Flight fetched successfully",
            data: Trip,
        })

    }catch(error) {
        console.error('Error during getsearch:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

exports.Updatesearch = async (req, res) => {
    try {
        const { id } = req.params
        const {  departure, arrival, startDate, endDate, adult, minor } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Bad Request',
                message: 'Trip ID Not Found to required for the update.',
            });
        }

        // Update the existing trip
        const updatedTrip = await prisma.trip.update({
            where: { 

                id:Number(id) 
            },
            data: {
                departure,
                arrival,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                adult,
                minor,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Flight updated successfully",
            data: updatedTrip,
        });
    } catch (error) {
        console.error('Error during search:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
exports.deleteTrip = async (req, res) => {
    try {
        const { id } = req.params

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Bad Request',
                message: 'Trip ID is required for deletion.',
            });
        }

        // Delete the trip
        const deletedTrip = await prisma.trip.delete({
            where: { id: parseInt(id) },
        });

        return res.status(200).json({
            success: true,
            message: 'Trip deleted successfully',
            data: deletedTrip,
        });
    } catch (error) {
        console.error('Error during delete:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}



