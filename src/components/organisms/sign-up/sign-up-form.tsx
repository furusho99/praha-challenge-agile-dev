"use client";

import { signUp } from "@/actions/sign-up";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

type PrevState = Awaited<ReturnType<typeof signUp>>;

const initialState = {
  error: "",
  prevState: {
    firstName: "",
    lastName: "",
    email: "",
  },
} satisfies PrevState;

export default function SignUpForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (_prevState: PrevState, formData: FormData) => {
      const result = await signUp(formData);
      if (result.error) {
        return result;
      } else {
        router.push("/");
        router.refresh();
        return {};
      }
    },
    initialState,
  );

  return (
    <form className="flex flex-col items-center" action={formAction}>
      <div className="w-full pb-12">
        <Label htmlFor="firstName" className="pb-2">
          名
        </Label>
        <Input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="山田"
          defaultValue={state?.prevState?.firstName ?? ""}
          required
          maxLength={20}
          minLength={1}
        />
      </div>
      <div className="w-full pb-12">
        <Label htmlFor="lastName" className="pb-2">
          姓
        </Label>
        <Input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="太郎"
          defaultValue={state?.prevState?.lastName ?? ""}
          maxLength={20}
          minLength={1}
        />
      </div>
      <div className="w-full pb-12">
        <Label htmlFor="email" className="pb-2">
          メールアドレス
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="example@example.com"
          defaultValue={state?.prevState?.email ?? ""}
          required
        />
      </div>
      <div className="w-full pb-12">
        <Label htmlFor="password" className="pb-2">
          パスワード
        </Label>
        <Input
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
          required
        />
      </div>
      {state?.error && state.error !== "" && (
        <p className="pb-5 text-red-500">{state.error}</p>
      )}
      <Button className="w-24" type="submit" disabled={isPending}>
        サインアップ
      </Button>
    </form>
  );
}
