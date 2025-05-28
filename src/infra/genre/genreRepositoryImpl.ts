/**
 * ジャンルリポジトリの実装
 */
import { db } from "@/infra/db";
import { genreTable } from "@/infra/schema";
import { Genre } from "@/domain/genre/genreTypes";
import { GenreRepository } from "@/domain/genre/genreRepository";

/**
 * ジャンルリポジトリの実装クラス
 */
export class GenreRepositoryImpl implements GenreRepository {
  async findAll(): Promise<Genre[]> {
    try {
      const genres = await db
        .select()
        .from(genreTable);

      // データベースのデータをドメインエンティティに変換
      return genres.map(genre => 
        Genre.reconstruct({ name: genre.name })
      );
    } catch (error) {
      console.error("ジャンルの取得に失敗しました:", error);
      throw new Error("ジャンルの取得に失敗しました");
    }
  }
}

/**
 * リポジトリのファクトリ関数
 */
let repository: GenreRepository | null = null;

export function getGenreRepository(): GenreRepository {
  if (!repository) {
    repository = new GenreRepositoryImpl();
  }
  return repository;
}
