'use client'

import { signIn } from "@/actions/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

const initialState = {
	error: "",
	prevState: {
		email: "",
	},
} as const;

export default function SignInForm() {
	const [state, formAction, isPending] = useActionState(
		async (_prevState: { error?: string; prevState?: { email: string } }, formData: FormData) => {
			return await signIn(formData);
		},initialState
	);

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
			{state?.error && state.error !== "" && (
				<p className="pb-5 text-red-500">
					{state.error}
				</p>
			)}
			<Button className="w-24" type="submit" disabled={isPending}>
				サインイン
			</Button>
		</form>
	);
}