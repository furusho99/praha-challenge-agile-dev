import { seasonSchema, SeasonType } from "@/validations/seasonSchemas";

/**
 * シーズンエンティティ
 */
export class Season {
  readonly #id: string;
  readonly #name: string;

  private constructor(props: SeasonType) {
    this.#id = props.id;
    this.#name = props.name;
  }

  public get id(): string {
    return this.#id;
  }

  public get name(): string {
    return this.#name;
  }

  static reconstruct(props: SeasonType): Season {
    const result = seasonSchema.safeParse(props);

    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }

    return new Season(result.data);
  }
}
