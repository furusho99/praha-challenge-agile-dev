"use server";

import { fetchAssignmentOfLatestVersionById as _fetcher } from "@/infra/assignments/fetchAssignmentOfLatestVersionById";

export async function fetchAssignmentOfLatestVersionById(
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
