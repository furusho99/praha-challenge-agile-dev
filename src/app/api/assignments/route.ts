import { NextResponse } from "next/server";
import { createAssignmentUsecase } from "@/usecases/assignments/createAssignmentUsecase";
import { getAssignmentRepository } from "@/infra/assignments/assignmentRepositoryImpl";
import { CreateAssignmentData } from "@/domain/assignments/assignmentTypes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const assignmentData: CreateAssignmentData = {
      title: body.title,
      genre: body.genre,
      description: body.description,
    };

    // リポジトリを取得
    const repository = getAssignmentRepository();
    
    // ユースケースを呼び出し
    const assignment = await createAssignmentUsecase(assignmentData, repository);

    return NextResponse.json(
      { message: "課題が正常に登録されました", assignment },
      { status: 201 }
    );
  } catch (error) {
    console.error("課題登録エラー:", error);
    return NextResponse.json(
      { message: "課題の登録に失敗しました" },
      { status: 500 }
    );
  }
}
