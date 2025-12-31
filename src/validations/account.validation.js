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