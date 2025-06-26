"use server";

import { db } from "@/infra/db";
import { teamsTable } from "@/infra/schema";
import { eq } from "drizzle-orm";

export interface Team {
  id: string;
  name: string;
  seasonId: string;
}

/**
 * チーム一覧を取得するサーバーアクション
 */
export async function getTeams(): Promise<{
  success: boolean;
  data: Team[];
  message?: string;
}> {
  try {
    const teams = await db.select().from(teamsTable);

    return {
      success: true,
      data: teams.map((team) => ({
        id: team.id,
        name: team.name,
        seasonId: team.seasonId,
      })),
    };
  } catch (error) {
    console.error("チーム取得エラー:", error);
    return {
      success: false,
      data: [],
      message: "チームの取得に失敗しました",
    };
  }
}

/**
 * 指定されたシーズンのチーム一覧を取得するサーバーアクション
 */
export async function getTeamsBySeasonId(seasonId: string): Promise<{
  success: boolean;
  data: Team[];
  message?: string;
}> {
  try {
    const teams = await db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.seasonId, seasonId));

    return {
      success: true,
      data: teams.map((team) => ({
        id: team.id,
        name: team.name,
        seasonId: team.seasonId,
      })),
    };
  } catch (error) {
    console.error("チーム取得エラー:", error);
    return {
      success: false,
      data: [],
      message: "チームの取得に失敗しました",
    };
  }
}
