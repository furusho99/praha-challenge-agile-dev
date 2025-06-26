/**
 * シーズン関連のバリデーションスキーマ定義
 */
import * as z from "zod";

/**
 * シーズンエンティティ用のスキーマ
 */
export const seasonSchema = z.object({
  id: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  name: z.string().min(1).max(100),
});

export type SeasonType = z.infer<typeof seasonSchema>;
