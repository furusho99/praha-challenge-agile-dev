/**
 * 課題リポジトリインターフェース
 * データアクセスの抽象化レイヤー
 */
import { Assignment } from "./assignmentTypes";

export interface AssignmentRepository {
  /**
   * 課題の一覧を取得するメソッド
   */
  findAll(): Promise<Assignment[]>;

  /**
   * 指定されたIDの課題一覧を取得するメソッド
   */
  findByIds(ids: string[]): Promise<Assignment[]>;

  /**
   * 課題を永続化するメソッド
   */
  save(data: Assignment): Promise<Assignment>;
}
