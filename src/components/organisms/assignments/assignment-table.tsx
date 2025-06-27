"use client";

import { Table } from "@/components/atoms/table";
import { TableHeader } from "@/components/atoms/table";
import { TableBody } from "@/components/atoms/table";
import { TableRow } from "@/components/atoms/table";
import { TableHead } from "@/components/atoms/table";
import { TableCell } from "@/components/atoms/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { useState } from "react";
import { Textarea } from "@/components/atoms/textarea";

enum AssignmentReviewStatus {
  PENDING = "PENDING",
  REVIEWED = "REVIEWED",
}

type AssignmentType = {
  id: string;
  title: string;
  description: string;
  genre: string;
  status: AssignmentReviewStatus;
};

const tasks: AssignmentType[] = [
  {
    id: "1",
    title: "DBモデリング1",
    description:
      "個人的に、WEBアプリケーションの各要素で最も強く影響を及ぼすのはデータベース設計だと感じます。アプリケーションを修正するのは比較的容易ですが、一度稼働を始めて本番データが大量に格納されているデータベースに変更を加える事は容易ではありません。古いスキーマから新しいスキーマにデータをマイグレーションする必要が生じるからです。マイグレーションをすると、過去のスキーマとの不整合から様々な問題が起きる可能性がありますし、本番サービスを止めて作業する必要があるため、稼働中のデータベースに対する変更は避けるに越した事はありません。丁寧に設定されたデータベースは仮に仕様が変更されたとしても変更箇所を最小限にとどめることができます。変更に強いDBスキーマを設計できるようになって、楽に本番サービスを運用できるようになりましょう！",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "2",
    title: "DBモデリング2",
    description:
      "DBモデリングは経験の世界です。何度も様々なケースのモデリングに取り組んで勘所を養っていきましょう！",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "3",
    title: "DBモデリング3",
    description:
      "DBモデリングは経験の世界です。何度も様々なケースのモデリングに取り組んで勘所を養っていきましょう！",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "4",
    title: "DBモデリング4",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "5",
    title: "DBモデリング5",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "6",
    title: "データベース設計のアンチパターンを学ぶ1",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "7",
    title: "データベース設計のアンチパターンを学ぶ2",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "8",
    title: "データベース設計のアンチパターンを学ぶ3",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "9",
    title: "データベース設計のアンチパターンを学ぶ4",
    description:
      "データベース設計には様々なアンチパターンがあるため、代表的なものを覚えておき、実務でDB設計を見た時に「あれ、これはアンチパターンでは？ちょっと立ち止まって考えてみよう」と立ち止まるキッカケになると幸いです",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "10",
    title: "データベース設計のアンチパターンを学ぶ5",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "11",
    title: "データベース設計のアンチパターンを学ぶ6",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "12",
    title: "データベース設計のアンチパターンを学ぶ7",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "13",
    title: "データベース設計のアンチパターンを学ぶ8",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "14",
    title: "データベース設計のアンチパターンを学ぶ9",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "15",
    title: "アンチパターンを踏まえてDBモデリングを見直そう",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "16",
    title: "マルチテナントについて",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "17",
    title: "外部キー制約について考える",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "18",
    title: "データベースにおけるNULLの扱い",
    description: "...",
    genre: "データベース設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "19",
    title: "jestで単体テストを書こう",
    description: "...",
    genre: "テスト",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "20",
    title: "storybookを作ろう",
    description: "...",
    genre: "テスト",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "21",
    title: "スナップショットテストを書こう",
    description: "...",
    genre: "テスト",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "22",
    title: "ビジュアル・リグレッションテストを書こう",
    description: "...",
    genre: "テスト",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "23",
    title: "E2Eテストを書こう",
    description: "...",
    genre: "テスト",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "24",
    title: "TDD（テスト駆動開発）でコードを書いてみる",
    description: "...",
    genre: "テスト",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "25",
    title: "基本的な設計原則",
    description: "...",
    genre: "設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "26",
    title: "オニオンアーキテクチャを学ぶ",
    description: "...",
    genre: "設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "27",
    title: "DDDを学ぶ（基礎） ",
    description: "...",
    genre: "設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "28",
    title: "特大課題：プラハチャレンジ",
    description: "...",
    genre: "設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "29",
    title: "DDDを学ぶ（応用）",
    description: "...",
    genre: "設計",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "31",
    title: "SQL10本ノック",
    description: "...",
    genre: "データベース",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "32",
    title: "インデックスを理解する",
    description: "...",
    genre: "データベース",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "33",
    title: "スロークエリを理解する",
    description: "...",
    genre: "データベース",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "34",
    title: "ビューを使いこなす",
    description: "...",
    genre: "データベース",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "35",
    title: "トランザクションについて理解する",
    description: "...",
    genre: "データベース",
    status: AssignmentReviewStatus.PENDING,
  },

  {
    id: "36",
    title: "はじめに React ( Next.js ) の環境を立ち上げよう",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "37",
    title: "適切にコンポーネントを分割して1ページ作ってみよう",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "38",
    title: "作ったページをレスポンシブ対応しよう",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "39",
    title: "よくあるボタンコンポーネントを作成する",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "40",
    title: "再利用しやすいコンポーネントのcssを考える",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "41",
    title: "State hooks を理解して ToDo アプリを実装しよう",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "42",
    title: "Effect hookを理解する",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "43",
    title: "Refを理解する",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "44",
    title: "フロントエンドのレンダリングパターンを学ぶ",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "45",
    title: "外部ライブラリの存在を隠蔽する",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "46",
    title: "SWR/React Queryを理解する",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "47",
    title: "Suspense（旧Concurrent mode）を理解する",
    description: "...",
    genre: "フロントエンド",
    status: AssignmentReviewStatus.PENDING,
  },

  {
    id: "48",
    title: "よく使うHTTPヘッダを理解する",
    description: "...",
    genre: "WEBの基礎",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "49",
    title: "curlとpostmanに慣れる",
    description: "...",
    genre: "WEBの基礎",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "50",
    title: "リクエストをパースするWEBサーバを作ってみる",
    description: "...",
    genre: "WEBの基礎",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "51",
    title: "クッキーを理解する",
    description: "...",
    genre: "WEBの基礎",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "52",
    title: "サードパーティクッキーについて理解する",
    description: "...",
    genre: "WEBの基礎",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "53",
    title: "CORSについて理解する",
    description: "...",
    genre: "WEBの基礎",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "54",
    title: "キャッシュについて理解する",
    description: "...",
    genre: "WEBの基礎",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "55",
    title: "WEBサービスの代表的な脆弱性を理解する",
    description: "...",
    genre: "WEBの基礎",
    status: AssignmentReviewStatus.PENDING,
  },

  {
    id: "56",
    title: "linterを使おう",
    description: "...",
    genre: "チーム開発",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "57",
    title: "CI環境を整備してみよう",
    description: "...",
    genre: "チーム開発",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "58",
    title: "チーム開発を円滑にするコツを覚えよう",
    description: "...",
    genre: "チーム開発",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "59",
    title: "ブランチ戦略を学ぼう",
    description: "...",
    genre: "チーム開発",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "60",
    title: "アジャイル開発を学ぼう",
    description: "...",
    genre: "チーム開発",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "61",
    title: "Gitの便利コマンドを覚える",
    description: "...",
    genre: "チーム開発",
    status: AssignmentReviewStatus.PENDING,
  },

  {
    id: "62",
    title: "安全なIAMの設計を理解する",
    description: "...",
    genre: "クラウドインフラ",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "63",
    title: "マルチAZに跨るVPCを構築する",
    description: "...",
    genre: "クラウドインフラ",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "64",
    title: "冗長化されたWebアプリケーションを作ってみよう",
    description: "...",
    genre: "クラウドインフラ",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "65",
    title: "S3を理解する",
    description: "...",
    genre: "クラウドインフラ",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "66",
    title: "CDN(CloudFront)について理解して使ってみよう",
    description: "...",
    genre: "クラウドインフラ",
    status: AssignmentReviewStatus.PENDING,
  },

  {
    id: "67",
    title: "ログの取り方を学ぼう",
    description: "...",
    genre: "サービス運用",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "68",
    title: "本番稼働中のデータベースをマイグレーションしよう",
    description: "...",
    genre: "サービス運用",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "69",
    title: "サービスのモニタリングを考える",
    description: "...",
    genre: "サービス運用",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "70",
    title: "Dockerで環境差分を吸収する",
    description: "...",
    genre: "サービス運用",
    status: AssignmentReviewStatus.PENDING,
  },

  {
    id: "71",
    title: "外部APIを活用してみよう",
    description: "...",
    genre: "高速MVP開発",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "72",
    title: "MVP用フロントエンドを実装してみよう",
    description: "...",
    genre: "高速MVP開発",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "73",
    title: "ログイン機能を実装してみよう",
    description: "...",
    genre: "高速MVP開発",
    status: AssignmentReviewStatus.PENDING,
  },
  {
    id: "74",
    title: "BaaSを利用してバックエンドを実装・デプロイしてみよう",
    description: "...",
    genre: "高速MVP開発",
    status: AssignmentReviewStatus.PENDING,
  },
];

export const AssignmentTable = () => {
  const [assignments, setAssignments] = useState<AssignmentType[]>(tasks);
  const [expandedTask, setExpandedTask] = useState<AssignmentType | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>タイトル</TableHead>
            <TableHead>説明</TableHead>
            <TableHead>ジャンル</TableHead>
            <TableHead>ステータス</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.title}</TableCell>
              <TableCell className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-gray-500 hover:cursor-pointer"
                    onClick={() => setExpandedTask(assignment)}
                  >
                    <Maximize2 className="h-4 w-4 text-gray-400" />
                  </Button>
                  <span className="truncate">{assignment.description}</span>
                </div>
              </TableCell>
              <TableCell>{assignment.genre}</TableCell>
              <TableCell>
                <Select
                  value={assignment.status ?? undefined}
                  onValueChange={(value) => {
                    setAssignments((prev) =>
                      prev.map((prevAssignment) => {
                        return prevAssignment.id === assignment.id
                          ? {
                              ...prevAssignment,
                              status: value as AssignmentReviewStatus,
                            }
                          : prevAssignment;
                      }),
                    );
                  }}
                >
                  <SelectTrigger
                    className={
                      assignment.status === AssignmentReviewStatus.PENDING
                        ? "text-orange-700 font-medium bg-orange-50 border border-orange-200"
                        : assignment.status === AssignmentReviewStatus.REVIEWED
                          ? "text-green-700 font-medium bg-green-50 border border-green-200"
                          : ""
                    }
                  >
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="PENDING"
                      className="text-orange-700 font-medium bg-orange-50 border border-orange-200"
                    >
                      レビュー待ち
                    </SelectItem>
                    <SelectItem
                      value="REVIEWED"
                      className="text-green-700 font-medium bg-green-50 border border-green-200"
                    >
                      レビュー済み
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={!!expandedTask}
        // 新しく開いた場合は!isOpenはfalseになるので、setExpandedTask(null)が呼ばれない
        // 閉じた場合に、setExpandedTask(null)が呼ばれる
        onOpenChange={(isOpen) => !isOpen && setExpandedTask(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{expandedTask?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Textarea readOnly value={expandedTask?.description} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};
