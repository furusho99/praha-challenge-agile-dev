"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Checkbox } from "@/components/atoms/checkbox";
import { Badge } from "@/components/atoms/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { AlertCircle } from "lucide-react";
import { SeasonSelect } from "@/components/organisms/seasons/season-select";
import { TeamSelect } from "@/components/organisms/teams/team-select";
import { getAssignments } from "@/actions/assignments";
import {
  createTeamsAssignment,
  getTeamsAssignments,
} from "@/actions/teams-assignments";
import { toast } from "sonner";

export default function TeamAssignmentPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [assignments, setAssignments] = useState<
    {
      id: string;
      title: string;
      genre: string;
      description: string;
    }[]
  >([]);
  const [teamAssignments, setTeamAssignments] = useState<
    { assignmentsId: string; isPublic: boolean }[]
  >([]);
  const [isLoadingTeamAssignments, setIsLoadingTeamAssignments] =
    useState<boolean>(false);

  // 課題の公開状態を切り替える
  const toggleTaskAssignment = async (assignmentsId: string) => {
    if (!selectedTeam) {
      toast.error("チームを選択してください");
      return;
    }

    try {
      if (!assignments.some((a) => a.id === assignmentsId)) {
        toast.error(`課題 ${assignmentsId} は存在しません`);
        return;
      }

      const currentIsPublic = isPublic(assignmentsId);

      await createTeamsAssignment({
        teamsId: selectedTeam,
        assignmentsId,
        isPublic: !currentIsPublic,
      });

      // チーム課題の状態を最新に更新
      const result = await getTeamsAssignments(selectedTeam);
      if (result.success) {
        setTeamAssignments(
          result.data.map((item) => ({
            assignmentsId: item.assignmentsId,
            isPublic: item.isPublic,
          })),
        );
      }

      if (!currentIsPublic) {
        toast.success("課題を公開しました。");
      } else {
        toast.success("課題を非公開にしました。");
      }
    } catch (error) {
      console.error("課題の公開状態更新エラー:", error);
      toast.error("課題の公開状態の更新に失敗しました");
    }
  };

  const isPublic = (assignmentsId: string) => {
    const teamsAssignment = teamAssignments.find(
      (assignment) => assignment.assignmentsId === assignmentsId,
    );
    return teamsAssignment ? teamsAssignment.isPublic : false;
  };

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const result = await getAssignments();
        if (result.success) {
          setAssignments(result.data);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("課題取得エラー:", error);
        toast.error("課題の取得に失敗しました");
      }
    }
    fetchAssignments();
  }, []);

  useEffect(() => {
    async function fetchTeamAssignments() {
      if (!selectedTeam) return;

      setIsLoadingTeamAssignments(true);
      try {
        const result = await getTeamsAssignments(selectedTeam);
        if (result.success) {
          setTeamAssignments(
            result.data.map((item) => ({
              assignmentsId: item.assignmentsId,
              isPublic: item.isPublic,
            })),
          );
        } else {
          toast.error(result.message);
          setTeamAssignments([]);
        }
      } catch (error) {
        console.error("チーム課題取得エラー:", error);
        setTeamAssignments([]);
      } finally {
        setIsLoadingTeamAssignments(false);
      }
    }
    fetchTeamAssignments();
  }, [selectedTeam]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">チームの課題公開状態</h1>
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
                <SeasonSelect
                  value={selectedSeason}
                  onValueChange={setSelectedSeason}
                  placeholder="シーズンを選択"
                  disabled={false}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="team" className="text-sm font-medium">
                  チーム
                </label>
                <TeamSelect
                  value={selectedTeam}
                  onValueChange={setSelectedTeam}
                  seasonId={selectedSeason}
                  placeholder="チームを選択"
                  disabled={!selectedSeason}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>課題の公開状態</CardTitle>
              <CardDescription>
                チームに公開する課題を選択してください
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
                      <TabsTrigger value="assigned">公開済み</TabsTrigger>
                      <TabsTrigger value="unassigned">未公開</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                      {isLoadingTeamAssignments ? (
                        <div className="flex items-center justify-center h-32">
                          <p className="text-muted-foreground">読み込み中...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {assignments.map((assignment) => (
                            <div
                              key={assignment.id}
                              className="flex items-start space-x-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                id={assignment.id}
                                checked={isPublic(assignment.id)}
                                onCheckedChange={() =>
                                  toggleTaskAssignment(assignment.id)
                                }
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor={assignment.id}
                                  className="text-sm font-medium cursor-pointer flex items-center"
                                >
                                  {assignment.title}
                                  <Badge
                                    variant="outline"
                                    className="ml-2 text-xs"
                                  >
                                    {assignment.genre}
                                  </Badge>
                                </label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {assignment.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="assigned" className="mt-4">
                      {isLoadingTeamAssignments ? (
                        <div className="flex items-center justify-center h-32">
                          <p className="text-muted-foreground">読み込み中...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {assignments
                            .filter((assignment) => isPublic(assignment.id))
                            .map((assignment) => (
                              <div
                                key={assignment.id}
                                className="flex items-start space-x-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                              >
                                <Checkbox
                                  id={assignment.id}
                                  defaultChecked={isPublic(assignment.id)}
                                  onCheckedChange={() => {
                                    toggleTaskAssignment(assignment.id);
                                  }}
                                />
                                <div className="flex-1">
                                  <label
                                    htmlFor={assignment.id}
                                    className="text-sm font-medium cursor-pointer flex items-center"
                                  >
                                    {assignment.title}
                                    <Badge
                                      variant="outline"
                                      className="ml-2 text-xs"
                                    >
                                      {assignment.genre}
                                    </Badge>
                                  </label>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {assignment.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="unassigned" className="mt-4">
                      {isLoadingTeamAssignments ? (
                        <div className="flex items-center justify-center h-32">
                          <p className="text-muted-foreground">読み込み中...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {assignments
                            .filter((assignment) => !isPublic(assignment.id))
                            .map((assignment) => (
                              <div
                                key={assignment.id}
                                className="flex items-start space-x-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                              >
                                <Checkbox
                                  id={`task-unassigned-${assignment.id}`}
                                  checked={isPublic(assignment.id)}
                                  onCheckedChange={() => {
                                    toggleTaskAssignment(assignment.id);
                                  }}
                                />
                                <div className="flex-1">
                                  <label
                                    htmlFor={`task-unassigned-${assignment.id}`}
                                    className="text-sm font-medium cursor-pointer flex items-center"
                                  >
                                    {assignment.title}
                                    <Badge
                                      variant="outline"
                                      className="ml-2 text-xs"
                                    >
                                      {assignment.genre}
                                    </Badge>
                                  </label>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {assignment.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
