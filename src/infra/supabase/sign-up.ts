"use server";

import { createClient } from "@/infra/supabase/server";

export async function signUpWithSupabase({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ error: Error | null; userId: string | null }> {
  const supabase = await createClient();

  //新規登録処理の冪等性確保のため、メールアドレスでユーザーを検索。
  const row = await supabase
    .schema("auth")
    .from("users")
    .select("id")
    .eq("email", email)
    .single<{
      id: string;
    }>();

  if (row.data) {
    return { error: null, userId: row.data.id };
  }

  const { error, data } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return { error, userId: data?.user?.id ?? null };
}
