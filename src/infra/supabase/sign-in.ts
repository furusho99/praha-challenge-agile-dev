'use server'

import { createClient } from "@/infra/supabase/client";

export async function signInWithSupabase(
    email: string, password: string
): Promise<{ error: Error | null }> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return { error };
}