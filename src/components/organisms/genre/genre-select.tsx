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
import { getGenres } from "@/actions/genres";

// ジャンルの型定義
type Genre = {
  name: string;
};

interface GenreSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function GenreSelect({
  value,
  onValueChange,
  placeholder = "ジャンルを選択",
  disabled = false,
}: GenreSelectProps) {
  // ジャンル一覧の状態管理
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);

  // コンポーネントマウント時にジャンル一覧を取得
  useEffect(() => {
    async function fetchGenres() {
      try {
        const result = await getGenres();
        if (result.success) {
          setGenres(result.data);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("ジャンル取得エラー:", error);
        toast.error("ジャンルの取得に失敗しました");
      } finally {
        setIsLoadingGenres(false);
      }
    }

    fetchGenres();
  }, []);

  const isDisabled = disabled || isLoadingGenres;
  const displayPlaceholder = isLoadingGenres ? "読み込み中..." : placeholder;

  return (
    <Select onValueChange={onValueChange} value={value} disabled={isDisabled}>
      <SelectTrigger>
        <SelectValue placeholder={displayPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {genres.map((genre: Genre) => (
          <SelectItem key={genre.name} value={genre.name}>
            {genre.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
