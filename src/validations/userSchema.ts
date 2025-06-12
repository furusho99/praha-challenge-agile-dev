import { z } from "zod";
import { emailSchema } from "./emailSchema";
import { userNameSchema } from "./userNameSchema";

export const userSchema = z.object({
  id: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  email: emailSchema,
  firstName: userNameSchema("名"),
  lastName: userNameSchema("姓"),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING", "GRADUATED", "DELTED"], {
    message: "有効なステータスを選択してください",
  }),
});
export type SignUpSchema = z.infer<typeof userSchema>;
