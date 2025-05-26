/**
 * 課題作成のユースケース
 */
import { Assignment, CreateAssignmentData } from "@/domain/assignments/assignmentTypes";
import { AssignmentRepository } from "@/domain/assignments/assignmentRepository";

export async function createAssignmentUsecase(
  data: CreateAssignmentData,
  assignmentRepository: AssignmentRepository
): Promise<Assignment> {
  const assignment = Assignment.create(
    data.title,
    data.genre,
    data.description
  );
  return await assignmentRepository.save(assignment);
}
