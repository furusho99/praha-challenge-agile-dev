/**
 * チーム割り当てリポジトリインターフェース
 * データアクセスの抽象化レイヤー
 */

import { TeamsAssignments } from "./teamsAssignmentsTypes";

export interface TeamsAssignmentsRepository {
  /**
   * チームIDに基づいてチーム割り当てを取得する
   */
  findByTeamId(teamsId: string): Promise<TeamsAssignments[]>;

  save(teamsAssignments: TeamsAssignments): Promise<void>;
}
