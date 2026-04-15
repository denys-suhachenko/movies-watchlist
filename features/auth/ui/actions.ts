'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import z from 'zod';

import { prisma } from '@/lib/prisma';
import { clearSessionCookie, setSessionCookie } from '@/lib/session';

export type AuthFormState = {
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
  };
  success?: boolean;
};

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});

export async function registerAction(
  _: unknown,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return {
      error: 'Invalid form data!',
    };
  }

  const { name, email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      error: 'User already exists!',
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  await setSessionCookie({
    userId: user.id,
    email: user.email,
  });

  redirect('/');
}

export async function loginAction(
  _: unknown,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return {
      error: 'Invalid form data!',
    };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      error: 'Invalid email or password!',
    };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return {
      error: 'Invalid email or password!',
    };
  }

  await setSessionCookie({
    userId: user.id,
    email: user.email,
  });

  redirect('/');
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect('/sign-in');
}
