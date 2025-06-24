/**
 * シーズン取得ユースケース
 */
import { SeasonRepository } from "@/domain/season/seasonRepository";
import { Season } from "@/domain/season/seasonTypes";

export async function getSeasonsUsecase(
  seasonRepository: SeasonRepository,
): Promise<Season[]> {
  return await seasonRepository.findAll();
}
