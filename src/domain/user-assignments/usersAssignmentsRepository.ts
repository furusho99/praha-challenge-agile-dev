/**
 * ユーザー課題リポジトリインターフェース
 * データアクセスの抽象化レイヤー
 */

import { UsersAssignments } from './userAssignmentsTypes';

export interface UsersAssignmentsRepository {
  /**
   * ユーザーIDに基づいて課題を取得する
   */
  findAssignmentsByUserId(userId: string): Promise<UsersAssignments[]>;
}
