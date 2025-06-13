"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { toast } from "sonner";
import {
  UpdateAssignmentSchema,
  updateAssignmentSchema,
} from "@/validations/assignmentSchemas";
import { GenreSelect } from "@/components/organisms/genre/genre-select";
import { updateAssignment } from "@/actions/update-assignment";

export default function AssignmentEditForm({
  assignment,
}: {
  assignment: {
    id: string;
    title: string;
    genre: string;
    description: string;
    version: number;
  };
}) {
  const { id, title, genre, description, version } = assignment;
  const form = useForm<UpdateAssignmentSchema>({
    resolver: zodResolver(updateAssignmentSchema),
    defaultValues: {
      id: id,
      title: title,
      genre: genre,
      description: description,
      version: version,
    },
  });

  async function onSubmit(formData: UpdateAssignmentSchema) {
    const result = await updateAssignment({
      ...formData,
      id,
      version,
    });

    if (!result.error) {
      toast.success("課題が更新されました");
    } else {
      toast.error(result.error || "エラーが発生しました");
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
                <FormDescription>
                  課題の内容が分かりやすいタイトルを入力してください
                </FormDescription>
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
                <FormControl>
                  <GenreSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="ジャンルを選択"
                  />
                </FormControl>
                <FormDescription>
                  課題のジャンルを選択してください
                </FormDescription>
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
                  <Textarea
                    placeholder="課題の詳細な説明を入力"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  課題の詳細な説明、目的、達成条件などを記入してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={form.formState.isSubmitting}
            >
              リセット
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "更新中..." : "課題を更新"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
