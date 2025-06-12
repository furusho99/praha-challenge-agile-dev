import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
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

export async function GenreSelect({
  value,
  onValueChange
}: GenreSelectProps) {
  const genres = await getGenres();

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={"ジャンルを選択"} />
      </SelectTrigger>
      <SelectContent>
        {genres.data.map((genre: Genre) => (
          <SelectItem key={genre.name} value={genre.name}>
            {genre.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
