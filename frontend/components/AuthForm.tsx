'use client';

import { useEffect, useState } from 'react';
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
import { createLinkToken, exchangePublicToken } from '@/services/plaid';
import { usePlaidLink } from 'react-plaid-link';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkToken, setLinkToken] = useState<string | null>(null);

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

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: async (public_token: string) => {
      try {
        await exchangePublicToken({ public_token });
        router.push('/');
      } catch (err) {
        setError('Bank connection failed. Please try again.');
      }
    },
    onExit: (err) => {
      if (err) setError('Plaid flow exited unexpectedly.');
    },
    onEvent: () => {},
  });

  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, ready, open]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      if (type === 'sign-up') {
        const userData = await signUpUser(data);
        localStorage.setItem('token', userData.token);
        const tokenRes = await createLinkToken();
        setLinkToken(tokenRes.linkToken);
      }

      if (type === 'sign-in') {
        const userData = await loginUser(data);
        localStorage.setItem('token', userData.token);
        router.push('/');
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form flex flex-col items-center justify-center min-h-screen bg-[#f4f8fd] px-2 py-8">
      <header className="mb-8 text-center">
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            width={64}
            height={64}
            alt="Logo"
            className="mx-auto mb-4"
            priority
          />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
        <p className="text-base text-gray-600">
          {type === 'sign-in'
            ? 'Welcome back! Please enter your credentials to sign in.'
            : 'Create an account to get started.'}
        </p>
      </header>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 space-y-5"
      >
        {type === 'sign-up' && (
          <>
            <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
            <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
          </>
        )}
        <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
        <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-4 rounded-lg flex items-center justify-center transition"
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

      <p className="mt-6 text-base text-gray-600">
        {type === 'sign-in' ? (
          <>
            Don’t have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">
              Sign In
            </Link>
          </>
        )}
      </p>

      {/* Manual fallback if auto Plaid open fails */}
      {linkToken && (
        <Button
          onClick={() => ready && open()}
          disabled={!ready}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white"
        >
          Connect Bank Account
        </Button>
      )}
    </section>
  );
};

export default AuthForm;