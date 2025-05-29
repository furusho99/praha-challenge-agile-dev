/**
 * ジャンルリポジトリインターフェース
 * データアクセスの抽象化レイヤー
 */
import { Genre } from "./genreTypes";

export interface GenreRepository {
  /**
   * ジャンルのリストを取得するメソッド
   */
  findAll(): Promise<Genre[]>;
}
