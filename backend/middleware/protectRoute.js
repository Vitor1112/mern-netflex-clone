import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
    try {
       // Quando a chave tem caracteres especiais, como o hífen (-), espaço, asterisco (*) ou outros caracteres que não podem ser usados com a notação de ponto. Então, nesse caso, você deve usar os colchetes [].
        const token = req.cookies["jwt-netflix"]
        if (!token) {
            return res.status(401).json({ sucess: false, message: "You are not authorized to access this route" });
        }
        const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ sucess: false, message: "You are not authorized to access this route" });
        }
        // dentro do decoded você tem a userId que foi passado na chave JWT, sem a senha
        const user = await User.findById(decoded.userId).select("-password");
    
        if (!user) {
            return res.status(401).json({ sucess: false, message:"User not found" });
            }
            req.user = user;//poderia ser qualquer nome  userId
            next();

    } catch (error) {

            res.status(500).json({ sucess: false, message: "Internal Server Error", error });
        
    }
}