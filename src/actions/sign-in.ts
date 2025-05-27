"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { signInSchema } from "@/validations/signInSchema";
import { signInUsecase } from "@/usecases/sign-in/SignInUsecase";
import { signInWithSupabase } from "@/infra/supabase/sign-in";

export async function signIn(formData: FormData): Promise<{
  error?: string;
  prevState?: {
    email: string;
  };
}> {
  try {
    const parsedFormData = signInSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    const { email, password } = parsedFormData;
    const result = await signInUsecase(email, password, signInWithSupabase);

    if (result.success) {
      redirect("/");
    } else {
      const prevState = { email: email };
      return {
        error: result.error,
        prevState,
      };
    }
  } catch (error) {
    const email =
      typeof formData.get("email") === "string" ? formData.get("email") : "";
    const prevState = { email: typeof email === "string" ? email : "" };

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
      redirect("/error");
    }
  }
}
