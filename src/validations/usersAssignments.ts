/**
 * ユーザー課題関連のバリデーションスキーマ定義
 */
import * as z from 'zod';

export enum AssignmentReviewStatus {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
}

/**
 * ユーザー課題エンティティ用のスキーマ
 */
export const usersAssignmentsSchemas = z.object({
  userId: z.string().uuid({ message: '有効なUUID形式ではありません' }),
  assignmentsId: z.string().uuid({ message: '有効なUUID形式ではありません' }),
  status: z.nativeEnum(AssignmentReviewStatus),
  isPublic: z.boolean(),
});

export type UsersAssignmentsType = z.infer<typeof usersAssignmentsSchemas>;
