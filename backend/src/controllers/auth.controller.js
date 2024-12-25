import { User } from "../models/user.model.js";
import { cloudinary } from "../config/cloudinary.js";
import { setTokenResponseCookie, clearTokenResponseCookie } from "../utils/index.js";

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
    setTokenResponseCookie("jwt", jwtToken, response);

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
    console.error("Error during user signup :", error.message);
    response.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false
    });
  }
}

export const handleUserLogIn = async (request, response) => {
  try {
    const { email, password } = request?.body;

    if(!email || !password) {
      return response.status(400).json({ message: "Please enter all the required fields", success: false });
    } 

    const existingUser = await User.findOne({ email: email });
    if(!existingUser) {
      return response.status(400).json({ message: "Invalid credentials", success: false });
    }

    const matchFound = await existingUser.isPasswordCorrect(password);
    if(!matchFound) {
      return response.status(400).json({ message: "Invalid credentials", success: false });
    }
    
    const jwtToken = existingUser.generateToken();
    setTokenResponseCookie("jwt", jwtToken, response);

    return response.status(200).json({
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        profileAvatar: existingUser.profileAvatar
      },
      message: "User login successful",
      success: true,
    });    
  }
  catch(error) {
    console.error("Error during user login :", error.message);
    response.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false
    });
  }
}

export const handleUserLogOut = async (request, response) => {
  try {
    clearTokenResponseCookie("jwt", response);
    return response.status(200).json({
      message: "User logout successful",
      success: true,
    });  
  }
  catch(error) {
    console.error("Error during user logout :", error.message);
    response.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false
    });
  }
}

export const handleUserProfileUpdate = async (request, response) => {
  try {
    const { profileAvatar } = request?.body;
    const userId = request?.user?._id;

    if(!profileAvatar) {
      return response.status(400).json({ message: "Profile picture is required", success: false });
    } 

    const uploadResponse = await cloudinary.uploader.upload(profileAvatar);
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { profileAvatar: uploadResponse?.secure_url },
      { new: true }
    );
    
    return response.status(200).json({
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        profileAvatar: updatedUser.profileAvatar
      },
      message: "User profile picture updated",
      success: true,
    });
  }
  catch(error) {
    console.error("Error during user profile update :", error.message);
    response.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false
    });
  }
}

export const handleCheckUserAuthentication = async (request, response) => {
  try {
    return response.status(200).json({
      user: request.user,
      message: "User is authenticated",
      success: true,
    });
  }
  catch(error) {
    console.error("Error during user auth check :", error.message);
    response.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false
    });
  }
}