import jwt from 'jsonwebtoken'
import '../config.js'
const {JWT_SECRET}=process.env;

const authenticate = (req, res, next) => {
   
        const cookieToken = req.cookies.token;
        let token=null;
        if (!cookieToken) {
            return res.status(401).json({ message: "No token provided" });
        } else {
            token = cookieToken;
        }
    


    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid token" });
    }
}
export default authenticate;