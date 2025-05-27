/**
 * 課題リポジトリインターフェース
 * データアクセスの抽象化レイヤー
 */
import { Assignment } from "./assignmentTypes";

export interface AssignmentRepository {
  /**
   * 課題を永続化するメソッド
   */
  save(data: Assignment): Promise<Assignment>;
}
