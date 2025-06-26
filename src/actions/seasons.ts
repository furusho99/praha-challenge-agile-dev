"use server";

import { getSeasonRepository } from "@/infra/seasons/seasonRepositoryImpl";
import { getSeasonsUsecase } from "@/usecases/season/getSeasonsUsecase";

export interface Season {
  id: string;
  name: string;
}

/**
 * シーズン一覧を取得するサーバーアクション
 */
export async function getSeasons() {
  try {
    const repository = getSeasonRepository();
    const seasons = await getSeasonsUsecase(repository);

    return {
      success: true,
      data: seasons.map((season) => ({
        id: season.id,
        name: season.name,
      })),
    };
  } catch (error) {
    console.error("シーズン取得エラー:", error);
    return {
      success: false,
      message: "シーズンの取得に失敗しました",
      data: [],
    };
  }
}
