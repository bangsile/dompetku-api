import bcrypt from "bcrypt";
import { prisma } from "../libs/prisma.js"

export const registerUser = async (data) => {
    const { name, username, password } = data;

    const existingUser = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUser) {
        throw new Error("Username sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            username,
            password: hashedPassword,
        },
    });

    return {
        id: user.id,
        name: user.name,
        username: user.username,
    };
};
