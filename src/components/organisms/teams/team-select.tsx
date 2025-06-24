"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { toast } from "sonner";
import { getTeams } from "@/actions/teams";

interface TeamSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  seasonId?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function TeamSelect({
  value,
  onValueChange,
  seasonId,
  placeholder = "チームを選択",
  disabled = false,
}: TeamSelectProps) {
  // チーム一覧の状態管理
  const [teams, setTeams] = useState<
    { id: string; name: string; seasonId: string }[]
  >([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);

  // コンポーネントマウント時にチーム一覧を取得
  useEffect(() => {
    async function fetchTeams() {
      try {
        const result = await getTeams();
        if (result.success) {
          setTeams(result.data);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("チーム取得エラー:", error);
        toast.error("チームの取得に失敗しました");
      } finally {
        setIsLoadingTeams(false);
      }
    }
    fetchTeams();
  }, []);

  const isDisabled = disabled || isLoadingTeams;
  const displayPlaceholder = isLoadingTeams ? "読み込み中..." : placeholder;

  return (
    <Select onValueChange={onValueChange} value={value} disabled={isDisabled}>
      <SelectTrigger>
        <SelectValue placeholder={displayPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {teams
          .filter((team) => team.seasonId === seasonId)
          .map((team) => (
            <SelectItem key={team.id} value={team.id}>
              {team.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
