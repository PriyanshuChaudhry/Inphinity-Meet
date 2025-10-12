import jwt from "jsonwebtoken";
import httpStatus from "http-status";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.query.token || req.body.token;

        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        req.username = decoded.username;
        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }
};

export const generateToken = (userId, username) => {
    return jwt.sign(
        { userId, username },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
};
