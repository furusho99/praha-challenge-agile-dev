import { userSchema } from "@/validations/userSchema";

type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "GRADUATED" | "DELETED";

export class User {
  readonly #id: string;
  readonly #email: string;
  readonly #firstName: string;
  readonly #lastName: string;
  readonly #status: UserStatus;

  private constructor(props: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: UserStatus;
  }) {
    const parsedUser = userSchema.parse(props);

    this.#id = parsedUser.id;
    this.#email = parsedUser.email;
    this.#firstName = parsedUser.firstName;
    this.#lastName = parsedUser.lastName;
    this.#status = props.status;
  }

  static create(props: {
    id: string; // 認証・認可実装の簡略化のため、supabase-authのuser.idを想定
    email: string;
    firstName: string;
    lastName: string;
    status: "ACTIVE";
  }): User {
    return new User({
      id: props.id,
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      status: props.status,
    });
  }

  get id(): string {
    return this.#id;
  }
  get email(): string {
    return this.#email;
  }
  get firstName(): string {
    return this.#firstName;
  }
  get lastName(): string {
    return this.#lastName;
  }

  get status(): UserStatus {
    return this.#status;
  }
}
