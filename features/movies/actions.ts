'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { getOptionalSession } from '@/lib/dal';

export type ActionState = {
  error: string;
  success: boolean;
};

const reviewSchema = z.object({
  movieId: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  text: z.string().min(10).max(500),
});

export async function createReviewAction(
  movieId: string,
  formData: FormData,
): Promise<ActionState> {
  const session = await getOptionalSession();

  if (!session?.userId) {
    return {
      error: 'User must be signed in!',
      success: false,
    };
  }

  const result = reviewSchema.safeParse({
    movieId,
    rating: Number(formData.get('rating')),
    text: formData.get('description'),
  });

  if (!result.success) {
    return {
      error: 'Failed!',
      success: false,
    };
  }

  try {
    await prisma.review.create({
      data: {
        ...result.data,
        userId: session.userId,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return {
          error: 'You have already reviewed this movie',
          success: false,
        };
      }
    }
  }

  revalidatePath(`/movies/${result.data.movieId}`);

  return {
    error: '',
    success: true,
  };
}
