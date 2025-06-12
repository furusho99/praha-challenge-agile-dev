"use server";

import {
  updateAssignmentSchema,
  type UpdateAssignmentSchema,
} from "@/validations/assignmentSchemas";
import { getAssignmentRepository } from "@/infra/assignments/assignmentRepositoryImpl";
import { revalidatePath } from "next/cache";
import { updateAssignmentUsecase } from "@/usecases/assignments/updateAssignmentUsecase";

export async function updateAssignment(
  formData: UpdateAssignmentSchema,
): Promise<{
  error?: string;
  prevState?: {
    title: string;
    genre: string;
    description: string;
  };
}> {
  const parsedFormData = updateAssignmentSchema.safeParse({
    title: formData.title,
    genre: formData.genre,
    description: formData.description,
    id: formData.id,
    version: formData.version,
  });
  if (!parsedFormData.success) {
    return {
      error: parsedFormData.error.errors.map((e) => e.message).join(", "),
      prevState: {
        title: formData.title,
        genre: formData.genre,
        description: formData.description,
      },
    };
  }
  const { title, genre, description, id, version } = parsedFormData.data;

  try {
    const repository = getAssignmentRepository();
    await updateAssignmentUsecase(
      {
        title,
        genre,
        description,
        id,
        version,
      },
      repository,
    );
    revalidatePath("/admin/assignments");
    return {};
  } catch (error) {
    console.error("課題更新エラー:", error);
    return {
      error:
        error instanceof Error ? error.message : "課題の更新に失敗しました",
      prevState: {
        title,
        genre,
        description,
      },
    };
  }
}
