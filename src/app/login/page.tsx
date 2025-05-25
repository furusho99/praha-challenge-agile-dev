import { Card } from "@/components/ui/card";
import LoginForm from "@/components/organisms/login/login-form";

export default function Login() {
	return (
		<main className="flex items-center justify-center h-screen">
			<Card className="w-full max-w-[672px] p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">ログイン</h1>
				<LoginForm />
			</Card>
		</main>
	);
}