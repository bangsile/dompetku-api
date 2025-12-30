import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const loginUser = async (data) => {
    const { username, password } = data;

    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user)
        throw new Error("Login gagal");

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
        throw new Error("Login gagal");

    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            username: user.username,
        },
    };
}

export const updateUser = async (data) => {
    const { id } = data;
    const { name, username } = data.body;

    if (username) {
        const existing = await prisma.user.findUnique({
            where: { username },
        });
        if (existing && existing.id !== id) {
            throw new Error("Username sudah digunakan")
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            name,
            username,
        },
        select: {
            id: true,
            name: true,
            username: true,
            createdAt: true,
        },
    });

    return updatedUser;
}
