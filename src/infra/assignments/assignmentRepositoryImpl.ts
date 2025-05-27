/**
 * 課題リポジトリの実装
 */
import { Assignment } from "@/domain/assignments/assignmentTypes";
import { AssignmentRepository } from "@/domain/assignments/assignmentRepository";

/**
 * 課題リポジトリの実装クラス
 */
export class AssignmentRepositoryImpl implements AssignmentRepository {
  private assignments: Assignment[] = [];

  async save(data: Assignment): Promise<Assignment> {
    this.assignments.push(data);

    // 実際の実装ではデータベースに保存
    // 例: await db.assignment.create({ data })

    return data;
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
