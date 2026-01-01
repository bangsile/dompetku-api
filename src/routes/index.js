import { Router } from "express";
import authRoutes from "./auth.routes.js";
import accountRoutes from "./account.route.js";
import categoryRoutes from "./category.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/account", authMiddleware, accountRoutes);
router.use("/category", authMiddleware, categoryRoutes);

router.get("/health", (req, res) => {
    res.json({
        status: "ok",
        time: new Date()
    });
});

export default router;
