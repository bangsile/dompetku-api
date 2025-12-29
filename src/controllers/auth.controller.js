import { registerSchema } from "../validations/auth.validation.js";
import { registerUser } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
            message: "Registrasi berhasil",
            data: user,
        });
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }
        return res.status(400).json({
            message: error.message || "Registrasi gagal",
        });
    }
};
