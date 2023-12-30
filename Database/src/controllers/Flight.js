
const prisma = require("../providers/ConnectDB")
const Authenticate = require("../utils/Guards");

exports.Create = async (req, res) => {
    try {
        const { departure, arrival, date } = req.body;

        // Input validation
        if (!departure || !arrival || !date || !date.startDate || !date.endDate) {
            return res.status(400).json({ success: false, message: "Invalid input data" });
        }

        const startDate = new Date(date.startDate);
        const endDate = new Date(date.endDate);

        if (startDate > endDate) {
            return res.status(400).json({ success: false, message: "Invalid date range" });
        }
        const createdFlight = await prisma.flight.create({
            data: {
                departure,
                arrival,
                startDate,
                endDate,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Flight created successfully",
            data: createdFlight,
        });
    } catch (e) {
        console.error("Error creating flight:", e);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


exports.FindAll = async (req, res) => {
    try {
        const resturants = await prisma.flight.findMany();

        if (!resturants) {
            return res.status(400).json({ message: "flight does not exist!" })
        }
        return res.status(200).json({
            success: true,
            message: "flight fetched successfully",
            data: resturants
        })
    } catch (err) {
        return res.status(400).json({ message: "flight does not exist!" });
    };
}

exports.FindId = async (req, res) => {
    try {
        const { id } = req.params

        const FindId = await prisma.flight.findUnique({
            where: {
                id: Number(id),
            }
        });
        if (!FindId) {
            return res.status(400).json({ message: "flight does not exist!" })
        }

        return res.status(200).json({
            success: true,
            message: "flight fetched successfully",
            data: FindId
        });
    } catch (err) {
        return res.status(400).json({ message: e });
    }
}






exports.Update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const UpdateResturent = await prisma.flight.update({
            where: {
                id: Number(id),
            },
            data: {
                name: name,
                email: email,
            }
        });
        if (!UpdateResturent) {
            return res.status(400).json({ message: "flight does not exist!" })
        }


        return res.status(200).json({
            success: true,
            message: "flight updated successfully",
            data: UpdateResturent
        })
    } catch (err) {

    }
}

exports.DeleteFlight = async (req, res) => {
    try {
        const { id } = req.params
        const Delete = await prisma.flight.delete({
            where: {
                id: Number(id),
            },

        });
        if (!Delete) {
            return res.status(400).json({ message: "flight does not exist!" });
        }
        return res.status(200).json({
            success: true,
            message: "flight deleted successfully",
            data: Delete
        });
    } catch (err) {
        return res.status(400).json({ message: e });
    }
}