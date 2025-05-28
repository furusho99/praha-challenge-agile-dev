import { User } from "@/domain/users/user";
import { UserRepository } from "@/domain/users/userRepository";

type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SignUpResult = {
  success: boolean;
  error?: string;
};

export type SignUp = (
  input: Pick<SignUpInput, "email" | "password">,
) => Promise<{ error: Error | null; userId: string | null }>;

export async function signUpUsecase(
  input: SignUpInput,
  signUp: SignUp,
  userRepository: UserRepository,
): Promise<SignUpResult> {
  const { error, userId } = await signUp({
    email: input.email,
    password: input.password,
  });

  if (error || !userId) {
    return { success: false, error: error?.message };
  }

  const user = User.create({
    id: userId,
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    status: "ACTIVE",
  });

  await userRepository.save(user);

  return {
    success: true,
    error: undefined,
  };
}
