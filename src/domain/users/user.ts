import { userSchema } from "@/validations/userSchema";

export class User {
  readonly #id: string;
  readonly #email: string;
  readonly #firstName: string;
  readonly #lastName: string;
  readonly #season: number;
  readonly #status: "ACTIVE" | "INACTIVE";

  private constructor(props: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    season: number;
    status: "ACTIVE" | "INACTIVE";
  }) {
    const parsedUser = userSchema.parse(props);

    this.#id = parsedUser.id;
    this.#email = parsedUser.email;
    this.#firstName = parsedUser.firstName;
    this.#lastName = parsedUser.lastName;
    this.#season = parsedUser.season;
    this.#status = props.status;
  }

  static create(props: {
    id: string; // 認証・認可実装の簡略化のため、supabase-authのuser.idを想定
    email: string;
    firstName: string;
    lastName: string;
    status: "ACTIVE" | "INACTIVE";
    season?: number;
  }): User {
    return new User({
      id: props.id,
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      status: props.status,
      season: 1, //seasonの生成は本来はルールがあるはずだが、一旦簡略的に実装。
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
  get season(): number {
    return this.#season;
  }

  get status(): "ACTIVE" | "INACTIVE" {
    return this.#status;
  }
}
