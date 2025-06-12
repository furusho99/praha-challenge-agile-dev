import { db } from "@/infra/db";
import { assignmentsTable } from "@/infra/schema";
import { eq } from "drizzle-orm";

export async function fetchAssignmentById(id: string): Promise<{
  id: string;
  title: string;
  genre: string;
  description: string;
  version: number;
}> {
  try {
    const assignment = await db
      .select({
        id: assignmentsTable.id,
        title: assignmentsTable.title,
        genre: assignmentsTable.genre,
        description: assignmentsTable.description,
        version: assignmentsTable.version,
      })
      .from(assignmentsTable)
      .where(eq(assignmentsTable.id, id))
      .limit(1)
      .execute();

    if (assignment.length === 0) {
      throw new Error(`Assignment with id ${id} not found`);
    }

    const data = assignment[0];
    return {
      id: data.id,
      title: data.title,
      genre: data.genre,
      description: data.description,
      version: data.version,
    };
  } catch (error) {
    console.error("Error fetching assignment by ID:", error);
    throw error;
  }
}
