import { z } from "zod";

export const userSuspensionRequestSchema = z.object({
  userId: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  fromYear: z
    .number()
    .int()
    .min(2020, { message: "有効な年を入力してください" }),
  fromMonth: z
    .number()
    .int()
    .min(1)
    .max(12, { message: "1から12の間で月を入力してください" }),
  untilYear: z
    .number()
    .int()
    .min(2020, { message: "有効な年を入力してください" }),
  untilMonth: z
    .number()
    .int()
    .min(1)
    .max(12, { message: "1から12の間で月を入力してください" }),
});
export type UserSuspensionSchema = z.infer<typeof userSuspensionRequestSchema>;
