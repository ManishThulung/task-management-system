import mongoose from "mongoose";

let DB_URI: string;
if (process.env.NODE_ENV === "LOCAL") {
  DB_URI = process.env.DB_URI_LOCAL;
  console.log(`Running on LOCAL: ${DB_URI}`);
} else {
  let DB_USER = process.env.MONGO_DB_USER;
  let DB_PASS = process.env.MONGO_DB_PASSWORD;
  DB_URI = `mongodb://${DB_USER}:${DB_PASS}@mongodb`;
  console.log(`Running on DOCKER: ${DB_URI}`);
}

export const connectDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`connected to mongodb ${DB_URI}`);
  } catch (error) {
    console.log("db connection error: ", error);
    throw error;
  }
};
