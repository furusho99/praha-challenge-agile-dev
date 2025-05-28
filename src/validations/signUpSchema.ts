//schema validation for sign up form including email,  password, first name, and last name
import { z } from "zod";
import { emailSchema } from "./emailSchema";
import { passwordSchema } from "./passwordSchema";
import { userNameSchema } from "./userNameSchema";

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: userNameSchema("名"),
  lastName: userNameSchema("姓"),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;
