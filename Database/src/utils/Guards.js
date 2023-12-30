const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token Not Found" });
    }

    
    const tokenWithoutBearer = token.split(" ")[1];

    jwt.verify(tokenWithoutBearer, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        req.decoded = decoded;

        next();
    });
};

module.exports = authenticate;