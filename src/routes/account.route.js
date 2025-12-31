import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { createAccountSchema, updateAccountSchema } from "../validations/account.validation.js";
import { createAccount, deleteAccount, getMyAccount, updateAccount } from "../controllers/account.controller.js";

const router = Router();

router.get("/", getMyAccount)
router.post("/", validate(createAccountSchema), createAccount)
router.patch("/:id", validate(updateAccountSchema), updateAccount)
router.delete("/:id", deleteAccount)

export default router;