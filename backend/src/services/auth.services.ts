import User, { UserDocument } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";

export const isExist = async (email: String): Promise<boolean> => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new ErrorHandler(500, "internal server error");
  }
};

export const createUser = async (
  name: String,
  email: String,
  password: String
): Promise<UserDocument> => {
  try {
    const user = await User.create({ name, email, password });
    return user;
  } catch (error) {
    throw new ErrorHandler(400, "cannot create user");
  }
};
