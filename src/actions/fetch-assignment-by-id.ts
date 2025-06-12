"use server";

import { fetchAssignmentById as _fetcher } from "@/infra/assignments/fetchAssignmentById";

export async function fetchAssignmentById(
  id: string,
  fetcher = _fetcher,
): Promise<{
  id: string;
  title: string;
  genre: string;
  description: string;
  version: number;
}> {
  try {
    const assignment = await fetcher(id);
    return assignment;
  } catch (error) {
    console.error("Error fetching assignment by ID:", error);
    throw error;
  }
}
