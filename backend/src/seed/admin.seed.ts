import User, { Roles } from "../models/user.model";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let DB_URI: string;
if (process.env.NODE_ENV === "LOCAL") {
  DB_URI = process.env.DB_URI_LOCAL;
} else {
  let DB_USER = process.env.MONGO_DB_USER;
  let DB_PASS = process.env.MONGO_DB_PASSWORD;
  DB_URI = `mongodb://${DB_USER}:${DB_PASS}@mongodb`;
}

export const connectDatabase = async () => {
  try {
    console.log(DB_URI, "DB_URI");
    await mongoose.connect(DB_URI);
    console.log(`connected to mongodb ${DB_URI}`);
  } catch (error) {
    console.log("db connection error: ", error);
    throw error;
  }
};

connectDatabase();

const addUser = async (
  name: string,
  email: string,
  password: string,
  role: Roles
) => {
  try {
    const user = await User.create({ name, email, password, role });
    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

addUser("Admin admin", "admin@google.com", "admin123", Roles.Admin);
