'use server';

import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import z from 'zod';

import { getOptionalSession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { setSessionCookie } from '@/lib/session';

type UpdateUserFormState = {
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
  };
  success?: boolean;
};

const updateUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().regex(/^(.{6,}|)$/),
});

export async function updateUserAction(
  _: unknown,
  formData: FormData,
): Promise<UpdateUserFormState> {
  const session = await getOptionalSession();

  if (!session?.userId) {
    return {
      error: 'User must be signed in!',
    };
  }

  const parsed = updateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password') ?? '',
  });

  if (!parsed.success) {
    return {
      error: 'Invalid form data!',
      success: false,
    };
  }

  const { name, email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
        NOT: {
          id: session.userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return {
        error: 'Validation error',
        fieldErrors: {
          email: 'This email is already in use',
        },
      };
    }

    const data: {
      name: string;
      email: string;
      passwordHash?: string;
    } = {
      name,
      email,
    };

    if (password) {
      data.passwordHash = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.userId,
      },
      data,
      select: {
        id: true,
        email: true,
      },
    });

    if (updatedUser.email !== session.email) {
      await setSessionCookie({
        userId: updatedUser.id,
        email: updatedUser.email,
      });
    }

    revalidatePath('/profile');

    return {
      success: true,
    };
  } catch {
    return {
      error: 'Something went wrong. Please try again.',
    };
  }
}
