import { teamSchemas, TeamType } from "@/validations/teamSchemas";

/**
 * チームエンティティ
 */
export class Team {
  readonly #id: string;
  readonly #name: string;
  readonly #seasonId: string;

  private constructor(props: TeamType) {
    this.#id = props.id;
    this.#name = props.name;
    this.#seasonId = props.seasonId;
  }

  public get id(): string {
    return this.#id;
  }

  public get name(): string {
    return this.#name;
  }

  public get seasonId(): string {
    return this.#seasonId;
  }

  static reconstruct(props: TeamType): Team {
    const result = teamSchemas.safeParse(props);

    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }

    return new Team(result.data);
  }
}
