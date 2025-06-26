"use server";

import { signOutUsecase } from "@/usecases/signOut/signOutUsecase";

export async function signOut() {
  try {
    const result = await signOutUsecase();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Logout failed:", error.message);
    } else {
      console.error("An unexpected error occurred during logout.");
    }
  }
}
