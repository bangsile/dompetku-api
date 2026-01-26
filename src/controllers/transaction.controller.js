import { createTransactionService, deleteTransactionService, getMyTransactionsService, getTransactionByIdService, updateTransactionService } from "../services/transaction.service.js";

export const getTransaction = async (req, res) => {
    const userId = req.user.id;
    const transactionId = req.params.id;

    try {
        const transaction = await getTransactionByIdService({ userId, transactionId });
        return res.status(200).json({
            message: "Berhasil mengambil data transaksi",
            data: transaction
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal mengambil data transaksi",
        });
    }
}

export const getMyTransactions = async (req, res) => {
    const userId = req.user.id;
    const { accountId, categoryId, type, startDate, endDate } = req.query

    const data = {
        userId, accountId, categoryId, type, startDate, endDate
    }

    try {
        const transaction = await getMyTransactionsService(data);
        return res.status(200).json({
            message: "Berhasil mengambil data transaksi akoh",
            data: transaction
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal mengambil data transaksi",
        });
    }
}

export const createTransaction = async (req, res) => {
    const userId = req.user.id;
    const data = { ...req.body, userId };

    try {
        const transaction = await createTransactionService(data);
        return res.status(201).json({
            message: "Berhasil membuat transaksi",
            data: transaction
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal membuat transaksi",
        });
    }
}

export const updateTransaction = async (req, res) => {
    const transactionId = req.params.id
    const data = { ...req.body, transactionId }

    try {
        const transaction = await updateTransactionService(data);
        return res.status(200).json({
            message: "Berhasil menyimpan perubahan transaksi",
            data: transaction
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal menyimpan perubahan transaksi",
        });
    }
}

export const deleteTransaction = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const result = await deleteTransactionService({ userId, id });
        if (result)
            return res.status(200).json({
                message: "Berhasil menghapus transaksi"
            })
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal menghapus transaksi",
        });
    }
}