import { Card } from "@/components/atoms/card";
import SignUpForm from "@/components/organisms/sign-up/sign-up-form";

export default function SignUp() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-[672px] p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">サインアップ</h1>
        <SignUpForm />
      </Card>
    </main>
  );
}
