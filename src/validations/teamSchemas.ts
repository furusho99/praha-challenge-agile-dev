/**
 * チーム関連のバリデーションスキーマ定義
 */
import * as z from "zod";

/**
 * チームエンティティ用のスキーマ
 */
export const teamSchemas = z.object({
  id: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  seasonId: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  name: z.string().min(1).max(100),
});

export type TeamType = z.infer<typeof teamSchemas>;
