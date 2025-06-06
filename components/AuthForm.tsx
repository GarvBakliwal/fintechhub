'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { loginUser, signUpUser } from '@/services/auth';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      let userData;
      if (type === 'sign-up') {
        userData = await signUpUser(data);
        router.push('/');
      }

      if (type === 'sign-in') {
        userData = await loginUser(data);
        router.push('/');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12">
      <header className="mb-8 text-center">
        <Link href="/">
          <Image src="/icons/logo.svg" width={50} height={50} alt="Logo" className="mx-auto mb-4" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
        <p className="text-sm text-gray-600">
          {type === 'sign-in'
            ? 'Welcome back! Please enter your credentials to sign in.'
            : 'Create an account to get started.'}
        </p>
      </header>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        {type === 'sign-up' && (
          <>
            <CustomInput
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
            <CustomInput
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
            />
          </>
        )}
        <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
        <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" /> Processing...
            </>
          ) : (
            type === 'sign-in' ? 'Sign In' : 'Sign Up'
          )}
        </Button>
      </form>

      {type === 'sign-in' ? (
        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      ) : (
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      )}
    </section>
  );
};

export default AuthForm;