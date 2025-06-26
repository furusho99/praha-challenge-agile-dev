"use server";

import { TeamsAssignments } from "@/domain/teams-assignments/teamsAssignmentsTypes";
import { getTeamsAssignmentsRepository } from "@/infra/teams-assignments/teamsAssignmentsRepositoryImpl";
import { getTeamsAssignmentsUsecase } from "@/usecases/teams-assignments/getTeamsAssignmentsUsecase";
import { TeamsAssignmentsType } from "@/validations/teamsAssignmentsSchemas";

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

/**
 * チーム割り当てを作成するサーバーアクション
 */
export async function createTeamsAssignment(data: TeamsAssignmentsType) {
  try {
    const teamsAssignment = TeamsAssignments.create(data);

    // 入力データのバリデーション
    const repository = getTeamsAssignmentsRepository();
    await repository.save(teamsAssignment);

    return {
      success: true,
      message: "課題が正常に保存されました",
    };
  } catch (error) {
    console.error("課題保存エラー:", error);
    return {
      success: false,
      message: "課題の保存に失敗しました",
    };
  }
}
