import { prisma } from "../libs/prisma.js";

export const getTransactionByIdService = async (data) => {
    const { userId, transactionId } = data

    const transaction = await prisma.transaction.findFirst({
        where: { id: transactionId, userId }
    })

    if (!transaction)
        throw new Error('Transaksi tidak ditemukan');

    return transaction;
}

export const getMyTransactionsService = async (data) => {
    const { userId, accountId, categoryId, type, startDate, endDate } = data;

    let where = { userId };
    let date;

    if (accountId) {
        where = { ...where, accountId }
    }
    if (categoryId) {
        where = { ...where, categoryId }
    }
    if (type) {
        where = { ...where, type }
    }
    if (startDate) {
        date = { ...date, gte: startDate }
        where = { ...where, date }
    }
    if (endDate) {
        date = { ...date, lte: endDate }
        where = { ...where, date }
    }

    const transaction = await prisma.transaction.findMany({
        where
    })

    return transaction;
}

export const createTransactionService = async (data) => {
    const {
        userId,
        accountId,
        categoryId,
        type,
        amount,
        note,
        date
    } = data;

    const currentBalance = type == 'income' ? { increment: amount } : { decrement: amount };

    return prisma.$transaction(async (tx) => {
        const account = await tx.account.update({
            data: {
                currentBalance
            },
            where: { id: accountId }
        })

        if (account.currentBalance < 0) {
            throw new Error('Saldo tidak mencukupi untuk melakukan transaksi')
        }

        const transaction = await tx.transaction.create({
            data: {
                userId,
                accountId,
                categoryId,
                type,
                amount,
                note,
                date
            }
        })

        return transaction;
    })
}

export const updateTransactionService = async (data) => {
    const {
        transactionId,
        note,
        date
    } = data;

    const transaction = await prisma.transaction.update({
        data: { note, date },
        where: { id: transactionId }
    })

    return transaction;
}

export const deleteTransactionService = async (data) => {
    const { userId, id } = data;

    const transaction = await prisma.transaction.findFirst({
        where: { id, userId }
    })

    if (!transaction) throw new Error("Transaksi tidak ditemukan");

    let currentBalance;

    if (transaction.type == 'income') {
        currentBalance = { decrement: transaction.amount }
    } else {
        currentBalance = { increment: transaction.amount }
    }

    prisma.$transaction(async (tx) => {
        await tx.account.update({
            where: { id: transaction.accountId },
            data: { currentBalance }
        })

        await prisma.transaction.delete({ where: { id } })
    })
    return true;
}