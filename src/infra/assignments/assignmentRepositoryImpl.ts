/**
 * 課題リポジトリの実装
 */
import { Assignment } from "@/domain/assignments/assignmentTypes";
import { AssignmentRepository } from "@/domain/assignments/assignmentRepository";
import { db } from "@/infra/db";
import { assignmentsTable } from "@/infra/schema";

/**
 * 課題リポジトリの実装クラス
 */
export class AssignmentRepositoryImpl implements AssignmentRepository {
  async save(data: Assignment): Promise<Assignment> {
    const insertedAssignment = await db
      .insert(assignmentsTable)
      .values({
        id: data.id,
        title: data.title,
        genre: data.genre,
        description: data.description,
      })
      .returning();

    const savedData = insertedAssignment[0];
    
    return Assignment.reconstruct({
      id: savedData.id.toString(),
      title: savedData.title,
      genre: savedData.genre,
      description: savedData.description,
    });
  }
}

/**
 * リポジトリのファクトリ関数
 */
let repository: AssignmentRepository | null = null;

export function getAssignmentRepository(): AssignmentRepository {
  if (!repository) {
    repository = new AssignmentRepositoryImpl();
  }
  return repository;
}
