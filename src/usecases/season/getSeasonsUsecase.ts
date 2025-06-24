/**
 * シーズン取得ユースケース
 */
import { SeasonRepository } from "@/domain/seasons/seasonRepository";
import { Season } from "@/domain/seasons/seasonTypes";

export async function getSeasonsUsecase(
  seasonRepository: SeasonRepository,
): Promise<Season[]> {
  return await seasonRepository.findAll();
}
