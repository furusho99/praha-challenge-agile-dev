/**
 * 課題リポジトリインターフェース
 * データアクセスの抽象化レイヤー
 */
import { Assignment, CreateAssignmentData } from "./assignmentTypes";

export interface AssignmentRepository {
  /**
   * 新しい課題を作成する
   */
  create(data: CreateAssignmentData): Promise<Assignment>;
}
