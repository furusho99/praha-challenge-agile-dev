/**
 * チーム取得ユースケース
 */
import { TeamRepository } from "@/domain/teams/teamRepository";
import { Team } from "@/domain/teams/teamTypes";

export async function getTeamsUsecase(
  teamRepository: TeamRepository,
): Promise<Team[]> {
  return await teamRepository.findAll();
}
