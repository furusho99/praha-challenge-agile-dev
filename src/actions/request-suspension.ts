"use server";

import { createClient } from "@/infra/supabase/server";
import { userSuspensionRequestUsecase } from "@/usecases/user-suspension/userSuspensionRequestUsecase";
import { UserSuspensionRepositoryImpl } from "@/infra/userSuspension/userSuspensionRepositoryImpl";
import { userSuspensionRequestSchema } from "@/validations/userSuspensionRequestSchema";

export async function requestSuspension(formData: FormData): Promise<{
  error?: string;
  prevState?: unknown;
}> {
  try {
    const untilYear = formData.get("untilYear");
    const untilMonth = formData.get("untilMonth");

    const furmYear = formData.get("fromYear");
    const fromMonth = formData.get("fromMonth");

    userSuspensionRequestSchema.parse({
      untilYear: untilYear,
      untilMonth: untilMonth,
      fromYear: furmYear,
      fromMonth: fromMonth,
    });

    const supabase = await createClient();

    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;

    if (!userId) {
      return { error: "User not found" };
    }

    const userSuspensionRepository = new UserSuspensionRepositoryImpl();

    userSuspensionRequestUsecase(
      {
        userId: userId,
        from: {
          year: Number(furmYear),
          month: Number(fromMonth),
        },
        until: {
          year: Number(untilYear),
          month: Number(untilMonth),
        },
      },
      userSuspensionRepository,
    );

    return {};
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
        prevState: {
          untilYear: formData.get("untilYear") as string,
          untilMonth: formData.get("untilMonth") as string,
          fromYear: formData.get("fromYear") as string,
          fromMonth: formData.get("fromMonth") as string,
        },
      };
    } else {
      return {
        error: "Unexpected error occurred during suspension.",
        prevState: {
          untilYear: formData.get("untilYear") as string,
          untilMonth: formData.get("untilMonth") as string,
          fromYear: formData.get("fromYear") as string,
          fromMonth: formData.get("fromMonth") as string,
        },
      };
    }
  }
}
