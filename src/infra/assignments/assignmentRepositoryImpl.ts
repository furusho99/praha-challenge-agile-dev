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
    // 仮のID生成（本来はデータベースが生成）
    const id = Math.floor(Math.random() * 1000);
    const now = new Date().toISOString();
    
    const newAssignment: Assignment = {
      ...data,
      id,
      created_at: now,
      updated_at: now,
    };
    
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
