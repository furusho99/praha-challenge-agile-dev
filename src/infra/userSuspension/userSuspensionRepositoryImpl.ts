import { db } from "@/infra/db";
import { UserSuspension } from "@/domain/userSuspension/userSuspension";
import { UserSuspensionRepository } from "@/domain/userSuspension/UserSuspensionRepository";
import { usersSuspensionTable } from "../schema";

export class UserSuspensionRepositoryImpl implements UserSuspensionRepository {
  async save(userSuspension: UserSuspension): Promise<void> {
    await db.insert(usersSuspensionTable).values({
      id: userSuspension.id,
      userId: userSuspension.userId,
      fromYear: userSuspension.from.year,
      fromMonth: userSuspension.from.month,
      untilYear: userSuspension.until.year,
      untilMonth: userSuspension.until.month,
    });
  }
}
