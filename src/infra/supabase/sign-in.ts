'use server'

import { createClient } from "@/infra/supabase/server";

export async function signInWithSupabase(
    email: string, password: string
): Promise<{ error: Error | null }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return { error };
}