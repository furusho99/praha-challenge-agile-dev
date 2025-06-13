/**
 * 課題関連のバリデーションスキーマ定義
 */
import * as z from "zod";

/**
 * 課題エンティティ用のスキーマ
 */
export const assignmentSchema = z.object({
  id: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  title: z.string().min(1).max(100),
  genre: z.string().min(1),
  description: z.string().min(1).max(1000),
  version: z.number().int().min(1, {
    message: "バージョンは1以上の整数である必要があります",
  }),
});

export type AssignmentType = z.infer<typeof assignmentSchema>;

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

/**
 * 課題更新用のバリデーションスキーマ
 */
export const updateAssignmentSchema = createAssignmentSchema.extend({
  id: z.string().uuid({ message: "有効なUUID形式ではありません" }),
  version: z.number().int().min(1, {
    message: "バージョンは1以上の整数である必要があります",
  }),
});
export type UpdateAssignmentSchema = z.infer<typeof updateAssignmentSchema>;
