'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithSupabase } from "@/infra/supabase/sign-in";
import { signInUsecase } from "@/usecases/sign-in/SignInUsecase";
import { useActionState } from "react";

export default function SignInForm() {
	const action = signInUsecase.bind(null, signInWithSupabase)
	const [state, formAction] = useActionState(action, null);

	return (
		<form className="flex flex-col items-center" action={formAction}>
			<div className="w-full pb-12">
				<Label htmlFor="email" className="pb-2">
					メールアドレス
				</Label>
				<Input id="email" type="email" name="email" placeholder="example@example.com" defaultValue={state?.prevState?.email ?? ""} />
			</div>
			<div className="w-full pb-12">
				<Label htmlFor="password" className="pb-2">
					パスワード
				</Label>
				<Input id="password" type="password" name="password" />
			</div>
			{
				state?.error && (
					<p className="pb-5 text-red-500">
						{state.error}
					</p>
				)
			}
			<Button className="w-24" type="submit">
				サインイン
			</Button>
		</form>
	);
}