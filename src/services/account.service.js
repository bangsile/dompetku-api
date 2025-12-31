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