"use server";

import { CreateAssignmentData } from "@/domain/assignments/assignmentTypes";
import {
  createAssignmentSchema,
  type CreateAssignmentSchema,
} from "@/validations/assignmentSchemas";
import { createAssignmentUsecase } from "@/usecases/assignments/createAssignmentUsecase";
import { getAssignmentRepository } from "@/infra/assignments/assignmentRepositoryImpl";
import { revalidatePath } from "next/cache";
import { getAssignmentsUsecase } from "@/usecases/assignments/getAssignmentsUsecase";

/**
 * 課題一覧を取得するサーバーアクション
 */
export async function getAssignments() {
  try {
    const repository = getAssignmentRepository();
    const assignments = await getAssignmentsUsecase(repository);

    return {
      success: true,
      data: assignments.map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        genre: assignment.genre,
        description: assignment.description,
      })),
    };
  } catch (error) {
    console.error("課題取得エラー:", error);
    return {
      success: false,
      message: "課題の取得に失敗しました",
      data: [],
    };
  }
}

/**
 * 課題を作成するサーバーアクション
 */
export async function createAssignment(data: CreateAssignmentSchema) {
  try {
    // 入力データのバリデーション
    const validatedData = createAssignmentSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message: "入力データが不正です",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // ドメインオブジェクトに変換（ここでもバリデーションが行われる）
    const createData = CreateAssignmentData.create(
      validatedData.data.title,
      validatedData.data.genre,
      validatedData.data.description,
    );

    // リポジトリを初期化
    const repository = getAssignmentRepository();

    // ユースケースを実行
    await createAssignmentUsecase(createData, repository);

    // キャッシュを更新
    revalidatePath("/admin/assignments");

    return {
      success: true,
      message: "課題が正常に登録されました",
    };
  } catch (error) {
    console.error("課題登録エラー:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "課題の登録に失敗しました",
      errors: {},
    };
  }
}
