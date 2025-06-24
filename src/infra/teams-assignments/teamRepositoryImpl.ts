/**
 * チームリポジトリの実装
 */
import { TeamsAssignmentsRepository } from "@/domain/teams-assignments/teamsAssignmentsRepository";
import { TeamsAssignments } from "@/domain/teams-assignments/teamsAssignmentsTypes";
import { db } from "@/infra/db";
import { teamsAssignmentsTable } from "@/infra/schema";
import { eq } from "drizzle-orm";

/**
 * チーム割り当てリポジトリの実装クラス
 */
export class TeamsAssignmentsRepositoryImpl
  implements TeamsAssignmentsRepository
{
  async findByTeamId(teamsId: string): Promise<TeamsAssignments[]> {
    try {
      // チームIDに基づいてチーム割り当てを取得
      const teamsAssignments = await db
        .select()
        .from(teamsAssignmentsTable)
        .where(eq(teamsAssignmentsTable.teamsId, teamsId));

      // データベースのデータをドメインエンティティに変換
      return teamsAssignments.map((assignment) =>
        TeamsAssignments.reconstruct({
          teamsId: assignment.teamsId,
          assignmentsId: assignment.assignmentsId,
          status: assignment.status,
          isPublic: assignment.isPublic,
        }),
      );
    } catch (error) {
      console.error("チーム割り当ての取得に失敗しました:", error);
      throw new Error("チーム割り当ての取得に失敗しました");
    }
  }
}

/**
 * リポジトリのファクトリ関数
 */
let repository: TeamsAssignmentsRepository | null = null;

export function getTeamsAssignmentsRepository(): TeamsAssignmentsRepository {
  if (!repository) {
    repository = new TeamsAssignmentsRepositoryImpl();
  }
  return repository;
}
