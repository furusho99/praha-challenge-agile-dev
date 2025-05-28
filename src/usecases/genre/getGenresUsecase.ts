/**
 * ジャンル取得ユースケース
 */
import { Genre } from "@/domain/genre/genreTypes";
import { GenreRepository } from "@/domain/genre/genreRepository";


export async function getGenresUsecase(
    genreRepository: GenreRepository
): Promise<Genre[]> {
    return await genreRepository.findAll();
}
