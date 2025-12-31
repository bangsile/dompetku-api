import { createAccountService, getMyAccountService, updateAccountService } from "../services/account.service.js";
import { me } from "./auth.controller.js";

export const getMyAccount = async (req, res) => {
    const userId = req.user.id;

    try {
        const account = await getMyAccountService(userId);
        return res.status(200).json({
            message: "Berhasil mengambil data akun/dompet",
            data: account,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal membuat akun/dompet",
        });
    }
}

export const createAccount = async (req, res) => {
    const userId = req.user.id;
    const data = { ...req.body, userId };

    try {
        const account = await createAccountService(data);
        return res.status(201).json({
            message: "Berhasil membuat akun/dompet",
            data: account,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal membuat akun/dompet",
        });
    }
}

export const updateAccount = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id
    const data = { ...req.body, userId, id };

    try {
        const account = await updateAccountService(data);
        return res.status(200).json({
            message: "Berhasil mengupdate akun/dompet",
            data: account
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal mengupdate akun/dompet"
        });
    }
}