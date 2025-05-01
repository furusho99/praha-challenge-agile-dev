import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
	return (
		<form className="flex flex-col items-center">
			<div className="w-full pb-12">
				<Label htmlFor="email" className="pb-2">
					メールアドレス
				</Label>
				<Input id="email" type="email" placeholder="example@example.com" />
			</div>
			<div className="w-full pb-12">
				<Label htmlFor="password" className="pb-2">
					パスワード
				</Label>
				<Input id="password" type="password" />
			</div>
			<p className="pb-5 text-red-500">メールアドレスまたはパスワードが間違っています</p>
			<Button className="w-24" type="submit">
				ログイン
			</Button>
		</form>
	);
}
