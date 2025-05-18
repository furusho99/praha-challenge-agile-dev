/**
 * 課題作成のユースケース
 */
import { Assignment, CreateAssignmentData } from "@/domain/assignments/assignmentTypes";
import { createAssignment } from "@/domain/assignments/assignmentService";
import { AssignmentRepository } from "@/domain/assignments/assignmentRepository";

export async function createAssignmentUsecase(
  data: CreateAssignmentData,
  assignmentRepository: AssignmentRepository
): Promise<Assignment> {
  try {
    // ドメインサービスを使って課題を作成
    const assignment = await createAssignment(data, assignmentRepository);
    
    // 必要に応じて追加の処理（例：通知送信など）
    
    return assignment;
  } catch (error) {
    console.error("課題作成エラー:", error);
    throw error;
  }
}
