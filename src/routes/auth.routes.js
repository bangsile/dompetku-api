import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateUserSchema } from "../validations/user.validation.js";
import { deleteMe, updateMe } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", authMiddleware, me);

router.patch("/me", authMiddleware, validate(updateUserSchema), updateMe);
router.delete("/me", authMiddleware, deleteMe);

export default router;
