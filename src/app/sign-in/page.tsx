import SignInForm from "@/components/organisms/sign-in/sign-in-form";
import { Card } from "@/components/atoms/card";

export default function SignIn() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-[672px] p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">サインイン</h1>
        <SignInForm />
      </Card>
    </main>
  );
}
