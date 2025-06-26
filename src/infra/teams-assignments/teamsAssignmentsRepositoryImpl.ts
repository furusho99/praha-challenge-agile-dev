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
          isPublic: assignment.isPublic,
        }),
      );
    } catch (error) {
      console.error("チーム割り当ての取得に失敗しました:", error);
      throw new Error("チーム割り当ての取得に失敗しました");
    }
  }

  async save(teamsAssignments: TeamsAssignments): Promise<void> {
    // すでに存在する場合は更新、存在しない場合は挿入
    await db
      .insert(teamsAssignmentsTable)
      .values({
        teamsId: teamsAssignments.teamsId,
        assignmentsId: teamsAssignments.assignmentsId,
        isPublic: teamsAssignments.isPublic,
      })
      .onConflictDoUpdate({
        target: [
          teamsAssignmentsTable.teamsId,
          teamsAssignmentsTable.assignmentsId,
        ],
        set: {
          isPublic: teamsAssignments.isPublic,
        },
      });
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
