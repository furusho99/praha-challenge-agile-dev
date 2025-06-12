import { User } from "@/domain/users/user";
import { UserRepository } from "@/domain/users/UserRepository";
import { db } from "../db";
import { usersTable } from "../schema";

export class UserRepositoryImpl implements UserRepository {
  public constructor(private readonly database = db) {}

  public async save(user: User): Promise<void> {
    await this.database
      .insert(usersTable)
      .values({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
        teamId: null,
        isAdministrator: false,
      })
      .onConflictDoUpdate({
        target: usersTable.id,
        set: {
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status,
          teamId: null,
          isAdministrator: false,
        },
      });
  }
}
