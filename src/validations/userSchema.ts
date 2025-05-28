//schema validation for sign up form including email,  password, first name, and last name
import { z } from "zod";
import { emailSchema } from "./emailSchema";
import { userNameSchema } from "./userNameSchema";

export const userSchema = z.object({
  id: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  email: emailSchema,
  firstName: userNameSchema("名"),
  lastName: userNameSchema("姓"),
  season: z
    .number()
    .int()
    .min(1, { message: "シーズンは1以上の整数でなければなりません" })
    .max(100, { message: "シーズンは100以下の整数でなければなりません" }),
  status: z.enum(["ACTIVE", "INACTIVE"], {
    message: "ステータスはACTIVEまたはINACTIVEでなければなりません",
  }),
});
export type SignUpSchema = z.infer<typeof userSchema>;
