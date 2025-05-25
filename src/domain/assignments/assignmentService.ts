/**
 * 課題に関するドメインサービス
 */
import { Assignment, CreateAssignmentData } from "./assignmentTypes";
import { AssignmentRepository } from "./assignmentRepository";

/**
 * 課題の作成処理
 */
export async function createAssignment(
  data: CreateAssignmentData,
  assignmentRepository: AssignmentRepository
): Promise<Assignment> {
  // ビジネスルールに基づく検証をここで行う
  // 例: 同一タイトルのチェックなど

  return await assignmentRepository.create(data);
}
