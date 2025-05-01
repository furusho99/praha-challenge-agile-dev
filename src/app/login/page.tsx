import { Heading } from "@/components/atoms/heading";
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/organisms/login/login-form";

export default function Login() {
	return (
		<main className="flex items-center justify-center h-screen">
			<Card className="w-full max-w-[672px] p-6">
				<Heading center>ログイン</Heading>
				<LoginForm />
			</Card>
		</main>
	);
}
