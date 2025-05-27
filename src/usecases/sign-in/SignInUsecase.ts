type SignInResult = {
  success: boolean;
  error?: string;
}

export type SignIn = (email: string, password: string) => Promise<{ error: Error | null }>

export async function signInUsecase(email: string, password: string, signIn: SignIn): Promise<SignInResult> {
    const { error } = await signIn(email, password)
    return {
        success: error === null,
        error: error ? error.message : undefined
    }
}