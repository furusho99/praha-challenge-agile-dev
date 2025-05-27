import * as z from "zod";

export const emailSchema = z
    .string()
    .email("無効なメールアドレスです")
    .min(1, "メールアドレスは必須です");

export type EmailSchema = z.infer<typeof emailSchema>;
