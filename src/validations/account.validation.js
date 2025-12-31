import { z } from "zod";

export const createAccountSchema = z.object({
    name: z.string({
        error: (iss) => iss.input === undefined ? "Nama wajib diisi" : "Nama harus berupa string"
    }),
    type: z.enum(['cash', 'bank', 'ewallet', 'saving'], {
        error: (iss) => iss.input === undefined ? "Tipe wajib diisi" : "Tipe tidak valid"
    }),
    initial_balance: z.int({
        error: (iss) => iss.input === undefined ? "Saldo awal wajib diisi" : "Saldo awal harus berupa angka"
    })
});

export const updateAccountSchema = z.object({
    name: z.string("Nama harus berupa string").optional(),
    type: z.enum(['cash', 'bank', 'ewallet', 'saving'], "Tipe tidak valid").optional()
}).refine((data) => data.name || data.type, {
    message: "Minimal salah satu field harus diisi"
});