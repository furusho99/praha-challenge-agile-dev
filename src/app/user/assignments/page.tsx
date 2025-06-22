import { AssignmentTable } from '@/components/organisms/assignments/assignment-table';

export default function Page() {
  return (
    <div className="container min-h-screen flex flex-col items-center justify-center py-10 mx-auto">
      <div className="w-full mx-auto border rounded-lg shadow-lg p-3 bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">課題一覧</h1>
        <AssignmentTable />
      </div>
    </div>
  );
}
