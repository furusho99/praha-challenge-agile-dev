/**
 * 課題作成のユースケース
 */
import { Assignment } from "@/domain/assignments/assignmentTypes";
import { AssignmentRepository } from "@/domain/assignments/assignmentRepository";

export async function updateAssignmentUsecase(
  payload: {
    id: string;
    title: string;
    genre: string;
    description: string;
    version: number;
  },
  assignmentRepository: AssignmentRepository,
): Promise<Assignment> {
  const { id, title, genre, description, version } = payload;
  const assignment = Assignment.create(title, genre, description, id, version);
  return await assignmentRepository.save(assignment.incrementVersion());
}
