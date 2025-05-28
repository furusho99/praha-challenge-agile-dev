import { genreSchema, GenreType } from "@/validations/genreSchemas";

/**
 * ジャンルエンティティ
 */
export class Genre {
  readonly #name: string;

  private constructor(props: GenreType) {
    this.#name = props.name;
  }

  public get name(): string {
    return this.#name;
  }
  
  static reconstruct(props: GenreType): Genre {
    const result = genreSchema.safeParse(props);

    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }

    return new Genre(result.data);
  }
}