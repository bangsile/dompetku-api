import { prisma } from "../libs/prisma.js";

export const getMyAccountService = async (id) => {
    const accounts = await prisma.account.findMany({
        where: { userId: id }
    });
    return accounts;
}

export const createAccountService = async (data) => {
    const { userId, name, type, initial_balance } = data;

    const account = await prisma.account.create({
        data:
        {
            userId,
            name,
            type,
            initialBalance: initial_balance,
            currentBalance: initial_balance
        }
    });

    return account;
}

export const updateAccountService = async (data) => {
    const { userId, id, name, type } = data;

    const account = await prisma.account.findFirst({
        where: { id, userId }
    })

    if (!account) throw new Error("Akun tidak ditemukan");

    let updatedData = {}

    if (name !== undefined) updatedData.name = name;
    if (type !== undefined) updatedData.type = type;

    const result = await prisma.account.update({
        where: { id },
        data: updatedData
    });

    return result;
}