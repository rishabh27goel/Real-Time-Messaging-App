import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    profileAvatar: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if(!this.isModified('password'))  return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
}

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId: this._id
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY
    }
  );
} 

export const User = mongoose.model("User", userSchema);