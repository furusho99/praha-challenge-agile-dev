/**
 * シーズン取得ユースケース
 */
import { AssignmentRepository } from "@/domain/assignments/assignmentRepository";
import { Assignment } from "@/domain/assignments/assignmentTypes";

export async function getAssignmentsUsecase(
  assignmentRepository: AssignmentRepository,
): Promise<Assignment[]> {
  return await assignmentRepository.findAll();
}
