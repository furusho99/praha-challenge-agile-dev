/**
 * 課題のドメインモデルと型定義
 */

/**
 * 課題エンティティ
 */
export type Assignment = {
  id?: number;
  title: string;
  genre: string;
  description: string;
  created_at?: string;
  updated_at?: string;
};

/**
 * 課題作成用のデータ型
 */
export type CreateAssignmentData = {
  title: string;
  genre: string;
  description: string;
};
