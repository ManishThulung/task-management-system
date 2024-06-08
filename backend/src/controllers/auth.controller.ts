import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../models/user.model";
import { createUser, isExist } from "../services/auth.services";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await isExist(email);
    if (userExists) {
      throw new ErrorHandler(409, "User already exist, Login instead!");
    }
    const user = await createUser(name, email, password);
    const accessToken = user.generateAccessToken();
    res.status(201).json({
      accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userExists = await isExist(email);
    if (!userExists) {
      throw new ErrorHandler(404, "User not found!");
    }

    const user = await User.findOne({ email }).select(
      "-createdAt -isDeleted -updatedAt"
    );
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ErrorHandler(401, "Invalid Credentials");
    }
    const accessToken = user.generateAccessToken();

    res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};
