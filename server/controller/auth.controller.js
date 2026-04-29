import User from "../model/user.model.js";
import  genToken  from "../config/token.js";

export const googleAuth = async (req, res) => {
    try {
        const {name, email,} = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email });
        }
        let token = genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error in googleAuth:", error);
        return res.status(500).json({ message: "Internal Server Error" });  
    }
}

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
