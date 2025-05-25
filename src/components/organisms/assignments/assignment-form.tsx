"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/atoms/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { toast } from "sonner"
import { createAssignmentSchema, type CreateAssignmentSchema } from "@/validations/assignmentSchemas"
import { createAssignment } from "@/actions/assignments"

// ジャンルのサンプルデータ（実際の実装ではAPIから取得する）
const GENRES = [
  { name: "データベース設計" },
  { name: "テスト" },
  { name: "設計" },
  { name: "データベース" },
  { name: "フロントエンド" },
  { name: "WEBの基礎" },
  { name: "チーム開発" },
  { name: "クラウドインフラ" },
  { name: "サービス運用" },
  { name: "高速MVP開発" },
]
  
export default function AssignmentForm() {

  const form = useForm<CreateAssignmentSchema>({
    resolver: zodResolver(createAssignmentSchema),
    defaultValues: {
      title: "",
      genre: "",
      description: "",
    },
  })

  async function onSubmit(values: CreateAssignmentSchema) {
    // サーバーアクションを呼び出す
    const result = await createAssignment(values);
    
    if (result.success) {
      // 成功メッセージを表示
      toast.success(result.message);
      
      // フォームをリセット
      form.reset();
      // TODO ページ遷移処理
    } else {
      // エラーメッセージを表示
      console.error("課題登録エラー:", result.errors);
      toast.error(result.message || "エラーが発生しました");
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="課題のタイトルを入力" {...field} />
                </FormControl>
                <FormDescription>課題の内容が分かりやすいタイトルを入力してください</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ジャンル</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="ジャンルを選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENRES.map((genre) => (
                      <SelectItem key={genre.name} value={genre.name}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>課題のジャンルを選択してください</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>説明</FormLabel>
                <FormControl>
                  <Textarea placeholder="課題の詳細な説明を入力" className="min-h-32" {...field} />
                </FormControl>
                <FormDescription>課題の詳細な説明、目的、達成条件などを記入してください</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => form.reset()} disabled={form.formState.isSubmitting}>
              リセット
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "登録中..." : "課題を登録"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
