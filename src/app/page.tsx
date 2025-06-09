"use server";

import { createClient } from "@/infra/supabase/server";

// スプリントmtgでのログインの動作確認用
export default async function Home() {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();

  return (
    <h1 className="text-5xl mt-20">
      ようこそ、{userResponse.data.user?.email}さん！
    </h1>
  );
}
