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

  /**
   * バリデーションを含むファクトリメソッド
   */
  static create(
    id: string,
    title: string,
    genre: string,
    description: string,
  ): Assignment {
    const result = assignmentSchema.safeParse({ id, title, genre, description });
    
    if (!result.success) {
      throw new Error(`バリデーションエラー: ${result.error.message}`);
    }
    
    return new Assignment(result.data);
  }
  
  // エンティティの等価性はIDで判断
  equals(other: Assignment): boolean {
    if (this.#id === undefined || other.#id === undefined) return false;
    return this.#id === other.#id;
  }

  // エンティティのシリアライズ（JSONに変換する際に便利）
  toJSON(): AssignmentType {
    return {
      id: this.#id,
      title: this.#title,
      genre: this.#genre,
      description: this.#description,
    };
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
  
  
  // 課題エンティティに変換
  toAssignment(): Assignment {
    // UUIDを生成
    const id = crypto.randomUUID();  
    return Assignment.create(
      id,
      this.#props.title,
      this.#props.genre,
      this.#props.description,
    );
  }
}
