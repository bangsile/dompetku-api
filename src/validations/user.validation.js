import { z } from "zod";

export const updateUserSchema = z.object({
    name: z.string("Nama harus berupa string").min(3, "Nama minimal 3 karakter").optional(),
    username: z.string("Username harus berupa string").min(3, "Username minimal 3 karakter").optional(),
});
