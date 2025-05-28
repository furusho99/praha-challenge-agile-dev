-- Custom SQL migration file, put your code below! --

-- ジャンルテーブルの初期データを挿入
INSERT INTO genre (name) VALUES 
  ('データベース設計'),
  ('テスト'),
  ('設計'),
  ('データベース'),
  ('フロントエンド'),
  ('WEBの基礎'),
  ('チーム開発'),
  ('クラウドインフラ'),
  ('サービス運用'),
  ('高速MVP開発')
ON CONFLICT (name) DO NOTHING;