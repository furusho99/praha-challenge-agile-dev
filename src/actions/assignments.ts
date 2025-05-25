"use server"

import { createAssignmentSchema, type CreateAssignmentSchema } from "@/validations/assignmentSchemas"
import { revalidatePath } from "next/cache"

/**
 * 課題を作成するサーバーアクション
 */
export async function createAssignment(data: CreateAssignmentSchema) {
  // 入力データのバリデーション
  const validatedData = createAssignmentSchema.safeParse(data)
  
  if (!validatedData.success) {
    return {
      success: false,
      message: "入力データが不正です",
      errors: validatedData.error.flatten().fieldErrors
    }
  }
  
  try {
    // APIを呼び出して課題を作成
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/assignments`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(validatedData.data),
    //   cache: 'no-store',
    // });
    
    // if (!response.ok) {
    //   throw new Error('課題の登録に失敗しました');
    // }
    
    // キャッシュを更新
    revalidatePath('/admin/assignments');
    
    return {
      success: true,
      message: "課題が正常に登録されました"
    };
  } catch (error) {
    console.error("課題登録エラー:", error);
    return {
      success: false,
      message: "課題の登録に失敗しました",
      errors: {}
    };
  }
}
