import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string({
        error: (iss) => iss.input === undefined ? "Nama wajib diisi" : "Nama harus berupa string"
    }),
    type: z.enum(['income', 'expense'], {
        error: (iss) => iss.input === undefined ? "Tipe wajib diisi" : "Tipe tidak valid"
    }),
});

export const updateCategorySchema = z.object({
    name: z.string("Nama harus berupa string").optional(),
    type: z.enum(['income', 'expense'], "Tipe tidak valid").optional()
}).refine((data) => data.name || data.type, {
    message: "Minimal salah satu field harus diisi"
});