import express, { Request, Response, Express, NextFunction } from "express";
import cors from "cors";
import ErrorHandler from "./utils/ErrorHandler";
import AuthRouter from "./routes/auth.routes";
import TaskRouter from "./routes/task.routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  origin: "http://localhost:5173",
};
app.use(cors(options));

app.use("/api/auth", AuthRouter);
app.use("/api/task", TaskRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new ErrorHandler(404, "Not Found");
  next(error);
});

app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Internal server error";
    return res.status(errorStatus).json({
      success: false,
      message: errorMessage,
    });
  }
);

export default app;
