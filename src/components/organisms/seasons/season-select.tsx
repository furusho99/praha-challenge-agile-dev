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
import { Season } from "@/domain/seasons/seasonTypes";
import { getSeasons } from "@/actions/seasons";

interface SeasonSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SeasonSelect({
  value,
  onValueChange,
  placeholder = "シーズンを選択",
  disabled = false,
}: SeasonSelectProps) {
  // シーズン一覧の状態管理
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [isLoadingSeasons, setIsLoadingSeasons] = useState(true);

  // コンポーネントマウント時にシーズン一覧を取得
  useEffect(() => {
    async function fetchSeasons() {
      try {
        const result = await getSeasons();
        if (result.success) {
          setSeasons(result.data);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("シーズン取得エラー:", error);
        toast.error("シーズンの取得に失敗しました");
      } finally {
        setIsLoadingSeasons(false);
      }
    }

    fetchSeasons();
  }, []);

  const isDisabled = disabled || isLoadingSeasons;
  const displayPlaceholder = isLoadingSeasons ? "読み込み中..." : placeholder;

  return (
    <Select onValueChange={onValueChange} value={value} disabled={isDisabled}>
      <SelectTrigger>
        <SelectValue placeholder={displayPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {seasons.map((season: Season) => (
          <SelectItem key={season.id} value={season.id}>
            {season.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
