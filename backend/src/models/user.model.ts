import { NextFunction } from "express";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export enum Roles {
  Admin = "Admin",
  User = "User",
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: Roles;
  deletedAt: Date | null;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // select: false,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.User,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: NextFunction) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
