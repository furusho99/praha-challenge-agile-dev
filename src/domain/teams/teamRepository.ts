/**
 * チームリポジトリインターフェース
 * データアクセスの抽象化レイヤー
 */
import { Team } from "./teamTypes";

export interface TeamRepository {
  /**
   * チームのリストを取得するメソッド
   */
  findAll(): Promise<Team[]>;
}
