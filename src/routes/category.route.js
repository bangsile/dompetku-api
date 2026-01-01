import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../validations/category.validation.js";
import { createCategory, deleteCategory, getMyCategories, updateCategory } from "../controllers/category.controller.js";

const router = Router();

router.get("/", getMyCategories);
router.post("/", validate(createCategorySchema), createCategory);
router.patch("/:id", validate(updateCategorySchema), updateCategory);
router.delete("/:id", deleteCategory);

export default router;