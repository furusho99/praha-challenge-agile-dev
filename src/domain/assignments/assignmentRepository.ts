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
   * 課題を永続化するメソッド
   */
  save(data: Assignment): Promise<Assignment>;
}
