import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { createAccountSchema } from "../validations/account.validation.js";
import { createAccount, getMyAccount } from "../controllers/account.controller.js";

const router = Router();

router.get("/", getMyAccount)
router.post("/", validate(createAccountSchema), createAccount)

export default router;