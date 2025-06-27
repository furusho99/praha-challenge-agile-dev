'use server';

import { getUserAssignmentsUsecase } from '@/usecases/user-assignments/getUserAssignmentsUsecase';
import { getUsersAssignmentsRepository } from '@/infra/users-assignments/usersAssignmentsRepositoryImpl';
import { getAssignmentRepository } from '@/infra/assignments/assignmentRepositoryImpl';

/**
 * ユーザーの課題一覧を取得するサーバーアクション
 */
export async function getUserAssignments(userId: string) {
  try {
    const usersAssignmentsRepository = getUsersAssignmentsRepository();
    const assignmentRepository = getAssignmentRepository();

    const userAssignmentsWithDetails = await getUserAssignmentsUsecase(
      userId,
      usersAssignmentsRepository,
      assignmentRepository
    );

    return {
      success: true,
      data: {
        userId: userAssignmentsWithDetails.userId,
        assignments: userAssignmentsWithDetails.assignmentsWithDetails.map(
          (assignment) => ({
            id: assignment.id,
            title: assignment.title,
            genre: assignment.genre,
            description: assignment.description,
            version: assignment.version,
          })
        ),
      },
    };
  } catch (error) {
    console.error('ユーザーの課題取得エラー:', error);
    return {
      success: false,
      message: 'ユーザーの課題取得に失敗しました',
      data: [],
    };
  }
}
