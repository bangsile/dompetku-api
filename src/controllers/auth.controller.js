import { registerSchema } from "../validations/auth.validation.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { prisma } from "../libs/prisma.js";

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

export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);

        return res.status(200).json({
            message: "Login berhasil",
            token: result.token,
            data: result.user
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Login gagal",
        });
    }
}

export const me = async (req, res) => {
    return res.json({
        message: "Berhasil mengambil data user",
        data: req.user,
    });
};

