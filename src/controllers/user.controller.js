import { deleteUser, updateUser } from "../services/auth.service.js";

export const updateMe = async (req, res) => {
    try {
        const data = {
            id: req.user.id,
            body: req.body
        }
        const user = await updateUser(data);

        return res.status(200).json({
            message: "Berhasil menguptade data user",
            data: user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Update user gagal",
        });
    }
}

export const deleteMe = async (req, res) => {
    try {
        const result = await deleteUser(req.user.id);
    
        return res.status(200).json({
            message: result,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Update user gagal",
        });
    }
    
}