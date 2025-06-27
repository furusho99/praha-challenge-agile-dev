import {
  usersAssignmentsSchemas,
  UsersAssignmentsType,
} from '@/validations/usersAssignments';
import { AssignmentReviewStatus } from '@/validations/usersAssignments';

/**
 * ユーザー課題エンティティ
 */
export class UsersAssignments {
  readonly #userId: string;
  readonly #assignmentsId: string;
  readonly #status: AssignmentReviewStatus;
  readonly #isPublic: boolean;

  private constructor(props: UsersAssignmentsType) {
    this.#userId = props.userId;
    this.#assignmentsId = props.assignmentsId;
    this.#status = props.status;
    this.#isPublic = props.isPublic;
  }

  public get userId(): string {
    return this.#userId;
  }

  public get assignmentsId(): string {
    return this.#assignmentsId;
  }

  public get status(): AssignmentReviewStatus {
    return this.#status;
  }

  public get isPublic(): boolean {
    return this.#isPublic;
  }

  static create(props: UsersAssignmentsType): UsersAssignments {
    const result = usersAssignmentsSchemas.safeParse(props);
    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }
    return new UsersAssignments(result.data);
  }

  static reconstruct(props: UsersAssignmentsType): UsersAssignments {
    const result = usersAssignmentsSchemas.safeParse(props);

    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }

    return new UsersAssignments(result.data);
  }
}
