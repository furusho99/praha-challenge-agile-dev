/**
 * チーム割り当て関連のバリデーションスキーマ定義
 */
import * as z from "zod";

/**
 * チームエンティティ用のスキーマ
 */
export const teamsAssignmentsSchemas = z.object({
  teamsId: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  assignmentsId: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  isPublic: z.boolean(),
});

export type TeamsAssignmentsType = z.infer<typeof teamsAssignmentsSchemas>;
