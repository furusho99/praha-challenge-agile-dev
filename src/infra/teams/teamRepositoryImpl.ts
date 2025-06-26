/**
 * チームリポジトリの実装
 */
import { TeamRepository } from "@/domain/teams/teamRepository";
import { Team } from "@/domain/teams/teamTypes";
import { db } from "@/infra/db";
import { teamsTable } from "@/infra/schema";

/**
 * チームリポジトリの実装クラス
 */
export class TeamRepositoryImpl implements TeamRepository {
  async findAll(): Promise<Team[]> {
    try {
      const teams = await db.select().from(teamsTable);

      // データベースのデータをドメインエンティティに変換
      return teams.map((team) =>
        Team.reconstruct({
          id: team.id,
          name: team.name,
          seasonId: team.seasonId,
        }),
      );
    } catch (error) {
      console.error("チームの取得に失敗しました:", error);
      throw new Error("チームの取得に失敗しました");
    }
  }
}

/**
 * リポジトリのファクトリ関数
 */
let repository: TeamRepository | null = null;

export function getTeamRepository(): TeamRepository {
  if (!repository) {
    repository = new TeamRepositoryImpl();
  }
  return repository;
}
