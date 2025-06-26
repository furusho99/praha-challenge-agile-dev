/**
 * シーズンリポジトリの実装
 */
import { db } from "@/infra/db";
import { seasonsTable } from "@/infra/schema";
import { SeasonRepository } from "@/domain/seasons/seasonRepository";
import { Season } from "@/domain/seasons/seasonTypes";

/**
 * シーズンリポジトリの実装クラス
 */
export class SeasonRepositoryImpl implements SeasonRepository {
  async findAll(): Promise<Season[]> {
    try {
      const seasons = await db.select().from(seasonsTable);

      // データベースのデータをドメインエンティティに変換
      return seasons.map((season) =>
        Season.reconstruct({ id: season.id, name: season.name }),
      );
    } catch (error) {
      console.error("シーズンの取得に失敗しました:", error);
      throw new Error("シーズンの取得に失敗しました");
    }
  }
}

/**
 * リポジトリのファクトリ関数
 */
let repository: SeasonRepository | null = null;

export function getSeasonRepository(): SeasonRepository {
  if (!repository) {
    repository = new SeasonRepositoryImpl();
  }
  return repository;
}
