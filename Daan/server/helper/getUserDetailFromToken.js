import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const { JWT_SECRET } = process.env;

const getUserDetailsFromToken = async (token) => {
    try {
        if (!token) {
            return {
                message: "session out",
                logout: true,
            };
        }

        const decode = await jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decode.userId).select('-password');
        return user;
    } catch (error) {
        console.error("Error verifying token: ", error.message);
        return {
            message: "Invalid or expired token",
            logout: true,
        };
    }
};

export default getUserDetailsFromToken;
