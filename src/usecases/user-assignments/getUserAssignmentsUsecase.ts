/**
 * ユーザーの課題一覧を取得するユースケース
 */
import { UsersAssignmentsRepository } from '@/domain/user-assignments/usersAssignmentsRepository';
import { AssignmentRepository } from '@/domain/assignments/assignmentRepository';
import { Assignment } from '@/domain/assignments/assignmentTypes';
import { AssignmentReviewStatus } from '@/validations/usersAssignments';

export type UserAssignmentWithDetails = {
  userId: string;
  assignmentsWithDetails: {
    id: string;
    title: string;
    genre: string;
    description: string;
    version: number;
    status: AssignmentReviewStatus;
  }[];
};

export async function getUserAssignmentsUsecase(
  userId: string,
  usersAssignmentsRepository: UsersAssignmentsRepository,
  assignmentRepository: AssignmentRepository
): Promise<UserAssignmentWithDetails> {
  // 1. ユーザーに紐づいた課題一覧を取得
  const userAssignments =
    await usersAssignmentsRepository.findAssignmentsByUserId(userId);

  // 2. 課題IDを抽出
  const assignmentIds = userAssignments.map((ua) => ua.assignmentsId);

  // 3. 課題詳細を取得
  const assignments = await assignmentRepository.findByIds(assignmentIds);

  // 4. 課題IDをキーにしたマップを作成
  const assignmentIdToAssignmentMap = new Map<string, Assignment>(
    assignments.map((a) => [a.id, a])
  );

  // 5. データを結合
  const assignmentsWithDetails = userAssignments.map((userAssignment) => {
    const assignment = assignmentIdToAssignmentMap.get(
      userAssignment.assignmentsId
    );

    if (!assignment) {
      throw new Error(
        `Assignment with id ${userAssignment.assignmentsId} not found`
      );
    }

    return {
      id: assignment.id,
      title: assignment.title,
      genre: assignment.genre,
      description: assignment.description,
      version: assignment.version,
      status: userAssignment.status as AssignmentReviewStatus,
    };
  });

  return {
    userId,
    assignmentsWithDetails,
  };
}
