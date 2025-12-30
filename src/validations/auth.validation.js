import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({
        error: (iss) => iss.input === undefined ? "Nama wajib diisi" : "Nama harus berupa string"
    }).min(3, "Nama minimal 3 karakter"),
    username: z.string({
        error: (iss) => iss.input === undefined ? "Username wajib diisi" : "Username harus berupa string"
    }).min(3, "Username minimal 3 karakter"),
    password: z.string({
        error: (iss) => iss.input === undefined ? "Password wajib diisi" : "Password harus berupa string"
    }).min(6, "Password minimal 6 karakter"),
});

export const loginSchema = z.object({
    username: z.string({
        error: (iss) => iss.input === undefined ? "Username wajib diisi" : "Username harus berupa string"
    }),
    password: z.string({
        error: (iss) => iss.input === undefined ? "Password wajib diisi" : "Password harus berupa string"
    })
});
