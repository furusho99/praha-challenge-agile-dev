import { UsersAssignmentsRepository } from '@/domain/user-assignments/usersAssignmentsRepository';
import { usersAssignmentsTable } from '../schema';
import { UsersAssignments } from '@/domain/user-assignments/userAssignmentsTypes';
import { db } from '@/infra/db';
import { eq } from 'drizzle-orm';
import { AssignmentReviewStatus } from '@/validations/usersAssignments';

export class UsersAssignmentsRepositoryImpl
  implements UsersAssignmentsRepository
{
  async findAssignmentsByUserId(userId: string): Promise<UsersAssignments[]> {
    try {
      const usersAssignments = await db
        .select()
        .from(usersAssignmentsTable)
        .where(eq(usersAssignmentsTable.usersId, userId));

      return usersAssignments.map((userAssignment) =>
        UsersAssignments.reconstruct({
          userId: userAssignment.usersId,
          assignmentsId: userAssignment.assignmentsId,
          status: userAssignment.status as AssignmentReviewStatus,
          isPublic: userAssignment.isPublic,
        })
      );
    } catch (error) {
      console.error('ユーザーの課題取得に失敗しました:', error);
      throw new Error('ユーザーの課題取得に失敗しました');
    }
  }
}

let repository: UsersAssignmentsRepository | null = null;

export function getUsersAssignmentsRepository(): UsersAssignmentsRepository {
  if (!repository) {
    repository = new UsersAssignmentsRepositoryImpl();
  }
  return repository;
}
