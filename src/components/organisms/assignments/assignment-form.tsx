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

  // 課題作成のAPI呼び出し関数
  async function createAssignment(data: CreateAssignmentSchema) {
    const response = await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('課題の登録に失敗しました');
    }
    
    return await response.json();
  }

  async function onSubmit(values: CreateAssignmentSchema) {
    await createAssignment(values)
    .then(() => {
      // 成功メッセージを表示
      toast.success("課題が正常に登録されました");
      
      // フォームをリセット
      form.reset();
      // TODO ページ遷移処理
    })
    .catch((error) => {
      // エラーメッセージを表示
      console.error("課題登録エラー:", error);
      toast.error("エラーが発生しました");
    });
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
