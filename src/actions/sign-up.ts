"use server";

import { db } from "@/infra/db";
import { signUpWithSupabase } from "@/infra/supabase/sign-up";
import { UserRepositoryImpl } from "@/infra/users/userRepositoryImpl";
import { signUpUsecase } from "@/usecases/sign-up/SignUpUsecase";
import { signUpSchema } from "@/validations/signUpSchema";
import { z } from "zod";

type PrevState = {
  firstName: string;
  lastName: string;
  email: string;
};

export async function signUp(formData: FormData): Promise<{
  error?: string;
  prevState?: PrevState;
}> {
  const prevState = extractPrevState(formData);

  try {
    const parsedFormData = signUpSchema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const userRepository = new UserRepositoryImpl(db);

    const result = await signUpUsecase(
      parsedFormData,
      signUpWithSupabase,
      userRepository,
    );

    return result.success
      ? {}
      : {
          error: result.error,
          prevState,
        };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.errors.map((e) => e.message).join(", "),
        prevState,
      };
    } else if (error instanceof Error) {
      return {
        error: error.message,
        prevState,
      };
    } else {
      throw new Error("Unexpected error occurred during sign up.");
    }
  }
}

const extractPrevState = (formData: FormData): PrevState => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");

  return {
    firstName: typeof firstName === "string" ? firstName : "",
    lastName: typeof lastName === "string" ? lastName : "",
    email: typeof email === "string" ? email : "",
  };
};
