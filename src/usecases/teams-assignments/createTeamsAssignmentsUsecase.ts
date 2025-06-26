/**
 * シーズン取得ユースケース
 */
import { TeamsAssignmentsRepository } from "@/domain/teams-assignments/teamsAssignmentsRepository";
import { TeamsAssignments } from "@/domain/teams-assignments/teamsAssignmentsTypes";

export async function createTeamsAssignmentsUsecase(
  teamsId: string,
  assignmentsId: string,
  teamsAssignmentsRepository: TeamsAssignmentsRepository,
): Promise<TeamsAssignments[]> {
  const teamsAssignments = TeamsAssignments.create({
    teamsId,
    assignmentsId,
    isPublic: true,
  });

  await teamsAssignmentsRepository.save(teamsAssignments);
  return [teamsAssignments];
}
