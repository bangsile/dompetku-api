import { Router } from "express";
import {
    createTransaction,
    deleteTransaction,
    getMyTransactions,
    getTransaction,
    updateTransaction
} from "../controllers/transaction.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createTransactionSchema, updateTransactionSchema } from "../validations/transaction.validation.js";

const router = Router();

router.get("/", getMyTransactions);
router.get("/:id", getTransaction);
router.post("/", validate(createTransactionSchema), createTransaction);
router.patch("/:id", validate(updateTransactionSchema), updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;