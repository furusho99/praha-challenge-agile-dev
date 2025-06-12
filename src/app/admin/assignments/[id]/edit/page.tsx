import { fetchAssignmentOfLatestVersionById } from "@/actions/fetch-assignment-of-latest-version-by-id";
import AssignmentEditForm from "@/components/organisms/assignments/assignment-edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const assignment = await fetchAssignmentOfLatestVersionById(id);

  return (
    <div className="container min-h-screen flex flex-col items-center justify-center py-10 mx-auto">
      <div className="w-full max-w-2xl mx-auto border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">課題編集</h1>
        <AssignmentEditForm assignment={assignment} />
      </div>
    </div>
  );
}
