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
  /**
   * 課題の一覧を取得するメソッド
   */
  async findAll(): Promise<Assignment[]> {
    const assignments = await db.select().from(assignmentsTable);

    // versionとidで複合主キーのため、同一のidが存在する場合は最新のバージョンを取得
    const latestAssignments: Record<string, Assignment> = {};
    for (const assignment of assignments) {
      const key = assignment.id;
      if (!latestAssignments[key] || latestAssignments[key].version < assignment.version) {
        latestAssignments[key] = Assignment.reconstruct({
          id: assignment.id,
          title: assignment.title,
          genre: assignment.genre,
          description: assignment.description,
          version: assignment.version,
        });
      }
    }
    return Object.values(latestAssignments);
  }

  async save(data: Assignment): Promise<Assignment> {
    const insertedAssignment = await db
      .insert(assignmentsTable)
      .values({
        id: data.id,
        title: data.title,
        genre: data.genre,
        description: data.description,
        version: data.version,
      })
      .returning();

    const savedData = insertedAssignment[0];

    return Assignment.reconstruct({
      id: savedData.id,
      title: savedData.title,
      genre: savedData.genre,
      description: savedData.description,
      version: savedData.version,
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
