/**
 * シーズン取得ユースケース
 */
import { TeamsAssignmentsRepository } from "@/domain/teams-assignments/teamsAssignmentsRepository";
import { TeamsAssignments } from "@/domain/teams-assignments/teamsAssignmentsTypes";

export async function getTeamsAssignmentsUsecase(
  teamsId: string,
  teamsAssignmentsRepository: TeamsAssignmentsRepository,
): Promise<TeamsAssignments[]> {
  return await teamsAssignmentsRepository.findByTeamId(teamsId);
}
