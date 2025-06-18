import { UserSuspension } from "@/domain/userSuspension/userSuspension";
import { UserSuspensionRepository } from "@/domain/userSuspension/UserSuspensionRepository";

type UserSuspensionRequestInput = {
  userId: string;
  from: {
    year: number;
    month: number;
  };
  until: {
    year: number;
    month: number;
  };
};

export async function userSuspensionRequestUsecase(
  input: UserSuspensionRequestInput,
  userSuspensionRepository: UserSuspensionRepository,
): Promise<{ success: boolean; error?: string }> {
  try {
    const userSuspension = UserSuspension.create({
      userId: input.userId,
      from: input.from,
      until: input.until,
    });

    await userSuspensionRepository.save(userSuspension);

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
