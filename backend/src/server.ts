import dotenv from "dotenv";
dotenv.config();
import { connectDatabase } from "./config/database";
import app from "./app";

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (error: any) => {
  console.log(
    `Shutting down the server due to Unhandled Promise Rejection: ${error.message}`
  );
  server.close(() => {
    process.exit(1);
  });
});
