# praha-challenge-agile-dev
PrAha Challengeの疑似アジャイル開発課題用のリポジトリです。

## 開発環境のサーバー起動

```shell
npm run dev
```

## Drizzle Kit コマンド

### generate
schema.ts にテーブル定義を追加・変更した後、その変更をデータベースに反映するためのSQLファイルを生成したい場合に使用する。

```shell
npm run migration:generate
```

### push
開発中にスキーマ変更をすぐにテストしたい場合や、小規模なプロジェクトでマイグレーション履歴を厳密に管理しない場合に使用する。

```shell
npm run migration:push
```

### migrate
generate コマンドで生成したマイグレーションファイルをデータベースに適用し、スキーマを更新したい場合に使用する。

```shell
npm run migration:apply
```

### drop
データベースを初期化したい場合に使用する。

```shell
npm run migration:drop
```
