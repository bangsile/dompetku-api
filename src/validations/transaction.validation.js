import { z } from "zod";

export const createTransactionSchema = z.object({
    accountId: z.string({
        error: (iss) => iss.input === undefined ? "ID akun/dompet wajib diisi" : "ID akun/dompet harus berupa string"
    }),
    categoryId: z.string({
        error: (iss) => iss.input === undefined ? "ID kategori wajib diisi" : "ID kategori harus berupa string"
    }),
    type: z.enum(['income', 'expense'], {
        error: (iss) => iss.input === undefined ? "Tipe wajib diisi" : "Tipe tidak valid"
    }),
    amount: z.number({
        error: (iss) => iss.input === undefined ? "Jumlah wajib diisi" : "Jumlah harus berupa angka"
    }),
    note: z.string("Catatan harus berupa string").optional(),
    date: z.coerce.date({
        error: (iss) => iss.input === undefined ? "Tanggal wajib diisi" : "Tanggal tidak valid"
    })
});

export const updateTransactionSchema = z.object({
    note: z.string("Catatan harus berupa string").optional(),
    date: z.coerce.date({
        error: (iss) => iss.input === undefined ? "Tanggal wajib diisi" : "Tanggal tidak valid"
    }).optional()
});