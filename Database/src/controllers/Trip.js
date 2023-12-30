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


