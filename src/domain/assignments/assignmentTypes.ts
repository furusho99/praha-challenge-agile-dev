import * as z from "zod";
import { assignmentSchema, AssignmentType, createAssignmentSchema } from "@/validations/assignmentSchemas";

/**
 * 課題エンティティ
 */
export class Assignment {
  readonly #id: string;
  readonly #title: string;
  readonly #genre: string;
  readonly #description: string;

  private constructor(props: AssignmentType) {
    this.#id = props.id;
    this.#title = props.title;
    this.#genre = props.genre;
    this.#description = props.description;
  }

  public get id(): string {
    return this.#id;
  }

  public get title(): string {
    return this.#title;
  }

  public get genre(): string {
    return this.#genre;
  }

  public get description(): string {
    return this.#description;
  }

  /**
   * バリデーションを含むファクトリメソッド
   */
  static create(
    title: string,
    genre: string,
    description: string,
  ): Assignment {
    // UUIDを生成
    const id = crypto.randomUUID();
    const result = assignmentSchema.safeParse({ id, title, genre, description });

    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }
    
    return new Assignment(result.data);
  }
}

/**
 * 課題作成用のデータ型
 */
export class CreateAssignmentData {
  readonly #props: z.infer<typeof createAssignmentSchema>;
  
  private constructor(props: z.infer<typeof createAssignmentSchema>) {
    this.#props = props;
  }

  public get title(): string {
    return this.#props.title;
  }
  public get genre(): string {
    return this.#props.genre;
  }
  public get description(): string {
    return this.#props.description;
  }
  
  /**
   * バリデーションを含むファクトリメソッド
   */
  static create(
    title: string,
    genre: string,
    description: string,
  ): CreateAssignmentData {
    const result = createAssignmentSchema.safeParse({ title, genre, description });
    
    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }
    
    return new CreateAssignmentData(result.data);
  }
}
