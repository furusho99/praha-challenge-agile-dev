import * as z from "zod";

export const passwordSchema = z
  .string()
  .min(6, "パスワードは6文字以上である必要があります")
  .max(50, "パスワードは50文字以下である必要があります");

export type PasswordSchema = z.infer<typeof passwordSchema>;
