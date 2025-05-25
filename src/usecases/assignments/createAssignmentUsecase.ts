/**
 * 課題作成のユースケース
 */
import { Assignment, CreateAssignmentData } from "@/domain/assignments/assignmentTypes";
import { AssignmentRepository } from "@/domain/assignments/assignmentRepository";

export async function createAssignmentUsecase(
  data: CreateAssignmentData,
  assignmentRepository: AssignmentRepository
): Promise<Assignment> {
  // リポジトリに永続化の依頼を行う
  return await assignmentRepository.save(data.toAssignment());
}
