/**
 * 課題リポジトリの実装
 */
import { Assignment, CreateAssignmentData } from "@/domain/assignments/assignmentTypes";
import { AssignmentRepository } from "@/domain/assignments/assignmentRepository";

/**
 * 課題リポジトリの実装クラス
 */
export class AssignmentRepositoryImpl implements AssignmentRepository {
  private assignments: Assignment[] = [];

  async create(data: CreateAssignmentData): Promise<Assignment> {
    // UUIDを生成
    const id = crypto.randomUUID();
    
    const newAssignment = Assignment.create(
      id,
      data.title,
      data.genre,
      data.description
    );
    
    this.assignments.push(newAssignment);
    
    // 実際の実装ではデータベースに保存
    // 例: await db.assignment.create({ data })
    
    return newAssignment;
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
