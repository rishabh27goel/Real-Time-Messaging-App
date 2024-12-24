import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export const handleUserSignUp = async (request, response) => {
  try {
    const { fullName, email, password } = request?.body;

    if(!fullName || !email || !password) {
      return response.status(400).json({ message: "Please enter all the required fields", success: false });
    }      
    if(password.length < 8) {
      return response.status(400).json({ message: "Password must be atleast 8 characters", success: false });
    }

    const existingUser = await User.findOne({ email: email });
    if(existingUser) {
      return response.status(400).json({ message: "Email already exists", success: false });
    }
    
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: password
    });
  
    await newUser.save();
    const jwtToken = newUser.generateToken();
    
    response.cookie("jwt", jwtToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    });

    return response.status(201).json({
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email
      },
      message: "User created successfully",
      success: true,
    });
  }
  catch(error) {
    console.error("Error during user signup :", error);
    response.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false
    });
  }
}

export const handleUserLogIn = async (request, response) => {
  try {
    
  }
  catch(error) {
    console.error("Error during user login :", error);
    response.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false
    });
  }
}

export const handleUserLogOut = async (request, response) => {
  try {
    
  }
  catch(error) {
    console.error("Error during user logout :", error);
    response.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false
    });
  }
}