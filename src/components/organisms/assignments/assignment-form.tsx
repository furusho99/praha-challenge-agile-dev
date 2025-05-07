"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/atoms/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/form"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { toast } from "sonner"

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

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "タイトルは必須項目です",
    })
    .max(100, {
      message: "タイトルは100文字以内で入力してください",
    }),
  genre: z.string().min(1, {
    message: "ジャンルを選択してください",
  }),
  description: z
    .string()
    .min(1, {
      message: "説明は必須項目です",
    })
    .max(1000, {
      message: "説明は1000文字以内で入力してください",
    }),
})

export default function AssignmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genre: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // ここでAPIを呼び出して課題を登録する
      // 例: await createAssignment(values)
      console.log(values)

      // 成功メッセージを表示
      toast("課題が登録されました")

      // フォームをリセット
      form.reset()

      // 一覧ページに遷移（実際の実装に合わせて変更）
      // router.push("/admin/assignments")
    } catch (error) {
      console.error("課題登録エラー:", error)
      toast("エラーが発生しました")
    } finally {
      setIsSubmitting(false)
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <FormDescription>課題のカテゴリを選択してください</FormDescription>
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
            <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isSubmitting}>
              リセット
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "登録中..." : "課題を登録"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
