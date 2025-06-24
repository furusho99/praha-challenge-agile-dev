"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
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
import { SeasonSelect } from "@/components/organisms/seasons/season-select";
import { TeamSelect } from "@/components/organisms/teams/team-select";
import { getAssignments } from "@/actions/assignments";
import { getTeamsAssignments } from "@/actions/teams-assignments";
import { toast } from "sonner";

export default function TeamAssignmentPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<
    {
      id: string;
      title: string;
      genre: string;
      description: string;
    }[]
  >([]);
  const [teamAssignments, setTeamAssignments] = useState<string[]>([]);
  const [isLoadingTeamAssignments, setIsLoadingTeamAssignments] =
    useState<boolean>(false);

  // 課題の割り当て状態を切り替える
  const toggleTaskAssignment = (taskId: string) => {
    setTeamAssignments((prev) => {
      if (prev.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  };

  // 変更を保存する
  const saveChanges = () => {
    // ここで実際のAPIリクエストを行う
    console.log("保存された割り当て:", teamAssignments);
    setSuccessMessage("チームへの課題割り当てが保存されました");

    // 3秒後にメッセージを消す
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
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

  // チームが選択されたときに、そのチームの課題割り当て状況を取得する
  useEffect(() => {
    async function fetchTeamAssignments() {
      if (!selectedTeam) {
        setTeamAssignments([]);
        return;
      }

      setIsLoadingTeamAssignments(true);
      try {
        const result = await getTeamsAssignments(selectedTeam);
        if (result.success) {
          // チームに割り当てられている課題のIDを取得
          const assignedTaskIds = result.data.map((item) => item.assignmentsId);
          setTeamAssignments(assignedTaskIds);
        } else {
          toast.error(result.message);
          setTeamAssignments([]);
        }
      } catch (error) {
        console.error("チーム課題割り当て取得エラー:", error);
        toast.error("チーム課題割り当ての取得に失敗しました");
        setTeamAssignments([]);
      } finally {
        setIsLoadingTeamAssignments(false);
      }
    }
    fetchTeamAssignments();
  }, [selectedTeam]);

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
              <CardTitle>課題割り当て</CardTitle>
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
                                id={`task-${assignment.id}`}
                                checked={teamAssignments.includes(
                                  assignment.id,
                                )}
                                onCheckedChange={() =>
                                  toggleTaskAssignment(assignment.id)
                                }
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor={`task-${assignment.id}`}
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
                            .filter((assignment) =>
                              teamAssignments.includes(assignment.id),
                            )
                            .map((assignment) => (
                              <div
                                key={assignment.id}
                                className="flex items-start space-x-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                              >
                                <Checkbox
                                  id={`task-assigned-${assignment.id}`}
                                  checked={true}
                                  onCheckedChange={() => {
                                    toggleTaskAssignment(assignment.id);
                                  }}
                                />
                                <div className="flex-1">
                                  <label
                                    htmlFor={`task-assigned-${assignment.id}`}
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
                            .filter(
                              (assignment) =>
                                !teamAssignments.includes(assignment.id),
                            )
                            .map((assignment) => (
                              <div
                                key={assignment.id}
                                className="flex items-start space-x-3 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                              >
                                <Checkbox
                                  id={`task-unassigned-${assignment.id}`}
                                  checked={false}
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
