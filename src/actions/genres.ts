/**
 * ジャンル関連のサーバーアクション
 */
"use server";

import { getGenreRepository } from "@/infra/genre/genreRepositoryImpl";
import { getGenresUsecase } from "@/usecases/genre/getGenresUsecase";

/**
 * ジャンル一覧を取得するサーバーアクション
 */
export async function getGenres() {
  try {
    const repository = getGenreRepository();
    const genres = await getGenresUsecase(repository);

    // ジャンル名のみを返すように変換
    const genreNames = genres.map((genre) => ({ name: genre.name }));

    return {
      success: true,
      data: genreNames,
    };
  } catch (error) {
    console.error("ジャンル取得エラー:", error);
    return {
      success: false,
      message: "ジャンルの取得に失敗しました",
      data: [],
    };
  }
}
