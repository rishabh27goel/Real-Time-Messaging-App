import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; 
import { clearTokenResponseCookie } from "../utils/index.js";

export const protectedRoute = async function (request, response, next) {
  try {
    const jwtToken = request?.cookies?.jwt;
    if(!jwtToken) {
      return response.status(401).json({ message: "Unauthorized - No token provided", success: false });
    } 

    const decodedToken = jwt.verify(jwtToken, process.env.TOKEN_SECRET);
    const userObject = await User.findById(decodedToken?.userId, { password: 0 });
    
    if(!userObject) {
      return response.status(404).json({ message: "User not found", success: false });
    } 

    request.user = userObject;
    next();
  }
  catch(error) {
    // Handle Invalid Token
    if (error.name === "TokenExpiredError") {
      clearTokenResponseCookie("jwt", response);
      return response.status(401).json({ message: "Unauthorized - Token expired", success: false });
    }
    else if (error.name === "JsonWebTokenError") {
      clearTokenResponseCookie("jwt", response);
      return response.status(401).json({ message: "Unauthorized - Invalid token", success: false });
    }
    else {
      console.error("Error in protected route middleware : ", error.message);
      return response.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  }
}