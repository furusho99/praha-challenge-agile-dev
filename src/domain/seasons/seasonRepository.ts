/**
 * シーズンリポジトリインターフェース
 * データアクセスの抽象化レイヤー
 */
import { Season } from "./seasonTypes";

export interface SeasonRepository {
  /**
   * シーズンのリストを取得するメソッド
   */
  findAll(): Promise<Season[]>;
}
