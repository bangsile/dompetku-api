import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";

const app = express();

// middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// routes
app.use("/api", routes);

// health check
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "DompetKu API is running"
    });
});

export default app;
