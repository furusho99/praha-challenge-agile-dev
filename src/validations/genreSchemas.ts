/**
 * ジャンル関連のバリデーションスキーマ定義
 */
import * as z from "zod";

/**
 * ジャンルエンティティ用のスキーマ
 */
export const genreSchema = z.object({
  name: z.string().min(1).max(100),
});

export type GenreType = z.infer<typeof genreSchema>;
