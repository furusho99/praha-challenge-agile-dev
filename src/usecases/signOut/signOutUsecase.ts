import { createClient } from "../../infra/supabase/server";

//TODO: ログアウトの処理を引数から注入して、純粋関数にする。
export const signOutUsecase = async (): Promise<{ error: string | null }> => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  return {
    error: error ? error.message : null,
  };
};
