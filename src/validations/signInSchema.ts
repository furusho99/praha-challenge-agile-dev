import { z } from 'zod';
import { emailSchema } from './emailSchema';
import { passwordSchema } from './passwordSchema';

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type SignInSchema = z.infer<typeof signInSchema>;