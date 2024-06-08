import express from "express";
import { login, register } from "../controllers/auth.controller";
import { validation } from "../middleware/validation.middleware";
import { loginSchema, registrationSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/register", validation(registrationSchema), register);
router.post("/login", validation(loginSchema), login);

export default router;
