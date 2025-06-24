"use server";

import { getTeamsAssignmentsRepository } from "@/infra/teams-assignments/teamRepositoryImpl";
import { getTeamsAssignmentsUsecase } from "@/usecases/teams-assignments/getTeamsAssignmentsUsecase";

/**
 * チーム割り当て一覧を取得するサーバーアクション
 */
export async function getTeamsAssignments(teamsId: string) {
  try {
    const repository = getTeamsAssignmentsRepository();
    const teamsAssignments = await getTeamsAssignmentsUsecase(
      teamsId,
      repository,
    );

    return {
      success: true,
      data: teamsAssignments.map((assignment) => ({
        teamsId: assignment.teamsId,
        assignmentsId: assignment.assignmentsId,
        status: assignment.status,
        isPublic: assignment.isPublic,
      })),
    };
  } catch (error) {
    console.error("課題取得エラー:", error);
    return {
      success: false,
      message: "課題の取得に失敗しました",
      data: [],
    };
  }
}
