import {
  teamsAssignmentsSchemas,
  TeamsAssignmentsType,
} from "@/validations/teamsAssignmentsSchemas";

/**
 * チーム割り当てエンティティ
 */
export class TeamsAssignments {
  readonly #teamsId: string;
  readonly #assignmentsId: string;
  readonly #isPublic: boolean;

  private constructor(props: TeamsAssignmentsType) {
    this.#teamsId = props.teamsId;
    this.#assignmentsId = props.assignmentsId;
    this.#isPublic = props.isPublic;
  }

  public get teamsId(): string {
    return this.#teamsId;
  }

  public get assignmentsId(): string {
    return this.#assignmentsId;
  }

  public get isPublic(): boolean {
    return this.#isPublic;
  }

  static create(props: TeamsAssignmentsType): TeamsAssignments {
    const result = teamsAssignmentsSchemas.safeParse(props);
    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }
    return new TeamsAssignments(result.data);
  }

  static reconstruct(props: TeamsAssignmentsType): TeamsAssignments {
    const result = teamsAssignmentsSchemas.safeParse(props);

    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }

    return new TeamsAssignments(result.data);
  }
}

export class CreateTeamsAssignmentsData {
  readonly #teamsId: string;
  readonly #assignmentsId: string;
  readonly #isPublic: boolean;

  private constructor(props: TeamsAssignmentsType) {
    this.#teamsId = props.teamsId;
    this.#assignmentsId = props.assignmentsId;
    this.#isPublic = props.isPublic;
  }

  public get teamsId(): string {
    return this.#teamsId;
  }

  public get assignmentsId(): string {
    return this.#assignmentsId;
  }

  public get isPublic(): boolean {
    return this.#isPublic;
  }

  static create(props: TeamsAssignmentsType): CreateTeamsAssignmentsData {
    const result = teamsAssignmentsSchemas.safeParse(props);
    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }
    return new CreateTeamsAssignmentsData(result.data);
  }
}
