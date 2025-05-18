/**
 * 課題関連のバリデーションスキーマ定義
 */
import * as z from "zod";

/**
 * 課題作成用のバリデーションスキーマ
 */
export const createAssignmentSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "タイトルは必須項目です",
    })
    .max(100, {
      message: "タイトルは100文字以内で入力してください",
    }),
  genre: z.string().min(1, {
    message: "ジャンルを選択してください",
  }),
  description: z
    .string()
    .min(1, {
      message: "説明は必須項目です",
    })
    .max(1000, {
      message: "説明は1000文字以内で入力してください",
    }),
});


/**
 * バリデーションスキーマの型定義
 */
export type CreateAssignmentSchema = z.infer<typeof createAssignmentSchema>;
