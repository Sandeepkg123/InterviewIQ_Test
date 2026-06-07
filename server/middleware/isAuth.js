import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        let {token} = req.cookies
        if (!token) {
            return res.status(401).json({ message: "User does not have a token" });
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            console.error("Error in isAuth middleware:", verifyToken);
            return res.status(401).json({ message: "User does not have a valid token" });
        }
        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        console.error("Error in isAuth middleware:", error.message);
        return res.status(500).json({ message: "Cannot access userId Server Error" });
    }
}

export default isAuth;