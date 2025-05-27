import AssignmentForm from "@/components/organisms/assignments/assignment-form";

export default function Page() {
  return (
    <div className="container min-h-screen flex flex-col items-center justify-center py-10 mx-auto">
      <div className="w-full max-w-2xl mx-auto border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">課題登録</h1>
        <AssignmentForm />
      </div>
    </div>
  )
}
