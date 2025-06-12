"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { Button } from "@/components/atoms/button";
import { Checkbox } from "@/components/atoms/checkbox";
import { Badge } from "@/components/atoms/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { Alert, AlertDescription } from "@/components/atoms/alert";
import { CheckCircle, AlertCircle } from "lucide-react";

// モックデータ
const seasons = [
  { id: "1", name: "1期" },
  { id: "2", name: "2期" },
];

const teams = [
  { id: "1-1", name: "チーム1-1", seasonId: "1" },
  { id: "1-2", name: "チーム1-2", seasonId: "1" },
  { id: "2-1", name: "チーム2-1", seasonId: "2" },
  { id: "2-2", name: "チーム2-2", seasonId: "2" },
];

const tasks = [
  {
    id: "1",
    title: "DBモデリング1",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "2",
    title: "DBモデリング2",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "3",
    title: "DBモデリング3",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "4",
    title: "DBモデリング4",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "5",
    title: "DBモデリング5",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "6",
    title: "データベース設計のアンチパターンを学ぶ1",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "7",
    title: "データベース設計のアンチパターンを学ぶ2",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "8",
    title: "データベース設計のアンチパターンを学ぶ3",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "9",
    title: "データベース設計のアンチパターンを学ぶ4",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "10",
    title: "データベース設計のアンチパターンを学ぶ5",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "11",
    title: "データベース設計のアンチパターンを学ぶ6",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "12",
    title: "データベース設計のアンチパターンを学ぶ7",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "13",
    title: "データベース設計のアンチパターンを学ぶ8",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "14",
    title: "データベース設計のアンチパターンを学ぶ9",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "15",
    title: "アンチパターンを踏まえてDBモデリングを見直そう",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "16",
    title: "マルチテナントについて",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "17",
    title: "外部キー制約について考える",
    description: "...",
    genre: "データベース設計",
  },
  {
    id: "18",
    title: "データベースにおけるNULLの扱い",
    description: "...",
    genre: "データベース設計",
  },

  {
    id: "19",
    title: "jestで単体テストを書こう",
    description: "...",
    genre: "テスト",
  },
  { id: "20", title: "storybookを作ろう", description: "...", genre: "テスト" },
  {
    id: "21",
    title: "スナップショットテストを書こう",
    description: "...",
    genre: "テスト",
  },
  {
    id: "22",
    title: "ビジュアル・リグレッションテストを書こう",
    description: "...",
    genre: "テスト",
  },
  { id: "23", title: "E2Eテストを書こう", description: "...", genre: "テスト" },
  {
    id: "24",
    title: "TDD（テスト駆動開発）でコードを書いてみる",
    description: "...",
    genre: "テスト",
  },
  { id: "25", title: "基本的な設計原則", description: "...", genre: "設計" },
  {
    id: "26",
    title: "オニオンアーキテクチャを学ぶ",
    description: "...",
    genre: "設計",
  },
  { id: "27", title: "DDDを学ぶ（基礎） ", description: "...", genre: "設計" },
  {
    id: "28",
    title: "特大課題：プラハチャレンジ",
    description: "...",
    genre: "設計",
  },
  { id: "29", title: "DDDを学ぶ（応用）", description: "...", genre: "設計" },
  { id: "30", title: "リファクタリング", description: "...", genre: "設計" },
  {
    id: "31",
    title: "SQL10本ノック",
    description: "...",
    genre: "データベース",
  },
  {
    id: "32",
    title: "インデックスを理解する",
    description: "...",
    genre: "データベース",
  },
  {
    id: "33",
    title: "スロークエリを理解する",
    description: "...",
    genre: "データベース",
  },
  {
    id: "34",
    title: "ビューを使いこなす",
    description: "...",
    genre: "データベース",
  },
  {
    id: "35",
    title: "トランザクションについて理解する",
    description: "...",
    genre: "データベース",
  },

  {
    id: "36",
    title: "はじめに React ( Next.js ) の環境を立ち上げよう",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "37",
    title: "適切にコンポーネントを分割して1ページ作ってみよう",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "38",
    title: "作ったページをレスポンシブ対応しよう",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "39",
    title: "よくあるボタンコンポーネントを作成する",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "40",
    title: "再利用しやすいコンポーネントのcssを考える",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "41",
    title: "State hooks を理解して ToDo アプリを実装しよう",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "42",
    title: "Effect hookを理解する",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "43",
    title: "Refを理解する",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "44",
    title: "フロントエンドのレンダリングパターンを学ぶ",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "45",
    title: "外部ライブラリの存在を隠蔽する",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "46",
    title: "SWR/React Queryを理解する",
    description: "...",
    genre: "フロントエンド",
  },
  {
    id: "47",
    title: "Suspense（旧Concurrent mode）を理解する",
    description: "...",
    genre: "フロントエンド",
  },

  {
    id: "48",
    title: "よく使うHTTPヘッダを理解する",
    description: "...",
    genre: "WEBの基礎",
  },
  {
    id: "49",
    title: "curlとpostmanに慣れる",
    description: "...",
    genre: "WEBの基礎",
  },
  {
    id: "50",
    title: "リクエストをパースするWEBサーバを作ってみる",
    description: "...",
    genre: "WEBの基礎",
  },
  {
    id: "51",
    title: "クッキーを理解する",
    description: "...",
    genre: "WEBの基礎",
  },
  {
    id: "52",
    title: "サードパーティクッキーについて理解する",
    description: "...",
    genre: "WEBの基礎",
  },
  {
    id: "53",
    title: "CORSについて理解する",
    description: "...",
    genre: "WEBの基礎",
  },
  {
    id: "54",
    title: "キャッシュについて理解する",
    description: "...",
    genre: "WEBの基礎",
  },
  {
    id: "55",
    title: "WEBサービスの代表的な脆弱性を理解する",
    description: "...",
    genre: "WEBの基礎",
  },

  {
    id: "56",
    title: "linterを使おう",
    description: "...",
    genre: "チーム開発",
  },
  {
    id: "57",
    title: "CI環境を整備してみよう",
    description: "...",
    genre: "チーム開発",
  },
  {
    id: "58",
    title: "チーム開発を円滑にするコツを覚えよう",
    description: "...",
    genre: "チーム開発",
  },
  {
    id: "59",
    title: "ブランチ戦略を学ぼう",
    description: "...",
    genre: "チーム開発",
  },
  {
    id: "60",
    title: "アジャイル開発を学ぼう",
    description: "...",
    genre: "チーム開発",
  },
  {
    id: "61",
    title: "Gitの便利コマンドを覚える",
    description: "...",
    genre: "チーム開発",
  },

  {
    id: "62",
    title: "安全なIAMの設計を理解する",
    description: "...",
    genre: "クラウドインフラ",
  },
  {
    id: "63",
    title: "マルチAZに跨るVPCを構築する",
    description: "...",
    genre: "クラウドインフラ",
  },
  {
    id: "64",
    title: "冗長化されたWebアプリケーションを作ってみよう",
    description: "...",
    genre: "クラウドインフラ",
  },
  {
    id: "65",
    title: "S3を理解する",
    description: "...",
    genre: "クラウドインフラ",
  },
  {
    id: "66",
    title: "CDN(CloudFront)について理解して使ってみよう",
    description: "...",
    genre: "クラウドインフラ",
  },

  {
    id: "67",
    title: "ログの取り方を学ぼう",
    description: "...",
    genre: "サービス運用",
  },
  {
    id: "68",
    title: "本番稼働中のデータベースをマイグレーションしよう",
    description: "...",
    genre: "サービス運用",
  },
  {
    id: "69",
    title: "サービスのモニタリングを考える",
    description: "...",
    genre: "サービス運用",
  },
  {
    id: "70",
    title: "Dockerで環境差分を吸収する",
    description: "...",
    genre: "サービス運用",
  },

  {
    id: "71",
    title: "外部APIを活用してみよう",
    description: "...",
    genre: "高速MVP開発",
  },
  {
    id: "72",
    title: "MVP用フロントエンドを実装してみよう",
    description: "...",
    genre: "高速MVP開発",
  },
  {
    id: "73",
    title: "ログイン機能を実装してみよう",
    description: "...",
    genre: "高速MVP開発",
  },
  {
    id: "74",
    title: "BaaSを利用してバックエンドを実装・デプロイしてみよう",
    description: "...",
    genre: "高速MVP開発",
  },
];

// チームごとの課題割り当て状況（モック）
const initialAssignments: { [key: string]: string[] } = {
  "1-1": ["1", "2"],
  "1-2": ["1", "2", "3"],
  "2-1": ["1", "2", "3", "4"],
  "2-2": ["1", "2", "3", "4", "5"],
};

export default function TeamAssignmentPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [assignments, setAssignments] = useState(initialAssignments);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 選択されたシーズンに基づいてチームをフィルタリング
  const filteredTeams = selectedSeason
    ? teams.filter((team) => team.seasonId === selectedSeason)
    : [];

  // チームが選択されたときの課題割り当て状況
  const teamAssignments = selectedTeam ? assignments[selectedTeam] || [] : [];

  // 課題の割り当て状態を切り替える
  const toggleTaskAssignment = (taskId: string) => {
    setAssignments((prev) => {
      const newAssignments = { ...prev };

      if (!newAssignments[selectedTeam]) {
        newAssignments[selectedTeam] = [];
      }

      if (newAssignments[selectedTeam].includes(taskId)) {
        newAssignments[selectedTeam] = newAssignments[selectedTeam].filter(
          (id) => id !== taskId,
        );
      } else {
        newAssignments[selectedTeam] = [
          ...newAssignments[selectedTeam],
          taskId,
        ];
      }

      return newAssignments;
    });
  };

  // 変更を保存する
  const saveChanges = () => {
    // ここで実際のAPIリクエストを行う
    console.log("保存された割り当て:", assignments);
    setSuccessMessage("チームへの課題割り当てが保存されました");

    // 3秒後にメッセージを消す
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">チーム課題割り当て</h1>

      {successMessage && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>フィルター</CardTitle>
              <CardDescription>
                シーズンとチームを選択してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="season" className="text-sm font-medium">
                  シーズン
                </label>
                <Select
                  value={selectedSeason}
                  onValueChange={(value) => {
                    setSelectedSeason(value);
                    setSelectedTeam("");
                  }}
                >
                  <SelectTrigger id="season">
                    <SelectValue placeholder="シーズンを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season.id} value={season.id}>
                        {season.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="team" className="text-sm font-medium">
                  チーム
                </label>
                <Select
                  value={selectedTeam}
                  onValueChange={setSelectedTeam}
                  disabled={!selectedSeason}
                >
                  <SelectTrigger id="team">
                    <SelectValue placeholder="チームを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredTeams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>
                課題割り当て
                {selectedTeam && (
                  <span className="ml-2">
                    <Badge variant="outline">
                      {teams.find((t) => t.id === selectedTeam)?.name}
                    </Badge>
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                チームに割り当てる課題を選択してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedTeam ? (
                <div className="flex items-center justify-center h-64 border rounded-md border-dashed">
                  <div className="text-center text-muted-foreground">
                    <AlertCircle className="mx-auto h-12 w-12 mb-2 text-muted-foreground/50" />
                    <p>シーズンとチームを選択してください</p>
                  </div>
                </div>
              ) : (
                <>
                  <Tabs defaultValue="all" className="mb-6">
                    <TabsList>
                      <TabsTrigger value="all">すべての課題</TabsTrigger>
                      <TabsTrigger value="assigned">割り当て済み</TabsTrigger>
                      <TabsTrigger value="unassigned">未割り当て</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                      <div className="space-y-4">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-start space-x-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <Checkbox
                              id={`task-${task.id}`}
                              checked={teamAssignments.includes(task.id)}
                              onCheckedChange={() =>
                                toggleTaskAssignment(task.id)
                              }
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={`task-${task.id}`}
                                className="text-sm font-medium cursor-pointer flex items-center"
                              >
                                {task.title}
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-xs"
                                >
                                  {task.genre}
                                </Badge>
                              </label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {task.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="assigned" className="mt-4">
                      <div className="space-y-4">
                        {tasks
                          .filter((task) => teamAssignments.includes(task.id))
                          .map((task) => (
                            <div
                              key={task.id}
                              className="flex items-start space-x-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                id={`task-assigned-${task.id}`}
                                checked={true}
                                onCheckedChange={() =>
                                  toggleTaskAssignment(task.id)
                                }
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor={`task-assigned-${task.id}`}
                                  className="text-sm font-medium cursor-pointer flex items-center"
                                >
                                  {task.title}
                                  <Badge
                                    variant="outline"
                                    className="ml-2 text-xs"
                                  >
                                    {task.genre}
                                  </Badge>
                                </label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {task.description}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="unassigned" className="mt-4">
                      <div className="space-y-4">
                        {tasks
                          .filter((task) => !teamAssignments.includes(task.id))
                          .map((task) => (
                            <div
                              key={task.id}
                              className="flex items-start space-x-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                id={`task-unassigned-${task.id}`}
                                checked={false}
                                onCheckedChange={() =>
                                  toggleTaskAssignment(task.id)
                                }
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor={`task-unassigned-${task.id}`}
                                  className="text-sm font-medium cursor-pointer flex items-center"
                                >
                                  {task.title}
                                  <Badge
                                    variant="outline"
                                    className="ml-2 text-xs"
                                  >
                                    {task.genre}
                                  </Badge>
                                </label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {task.description}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end mt-6">
                    <Button onClick={saveChanges} disabled={!selectedTeam}>
                      変更を保存
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
