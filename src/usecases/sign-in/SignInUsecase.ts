'use server'

import { redirect } from 'next/navigation'
import { Email } from '@/domain/email/email'
import { Password } from '@/domain/password/password'
import { z } from 'zod'

export type SignIn = (email: string, password: string) => Promise<{ error: Error | null }>

export async function signInUsecase(signIn: SignIn, _prevState: unknown,formData: FormData) {
  try {
    const email = new Email(formData.get('email') as string)
    const password = new Password(formData.get('password') as string)
    
    const { error } = await signIn( email.value, password.value )

    if (error) {
      throw new Error(error.message)
    }
    
    redirect('/')
  } catch (error) {
    const email = formData.get('email') as string
    if (error instanceof z.ZodError) {
      return {
        error: error.errors.map(e => e.message).join(', '),
        prevState: { email }
      }
    } else if (error instanceof Error) {
        return {
          error: error.message,
          prevState: { email }
        }
    } else {
        redirect('/')
    }
  }
}