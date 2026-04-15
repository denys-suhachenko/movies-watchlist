import 'server-only';

import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { verifyToken } from './session';
import { prisma } from './prisma';

export const getOptionalSession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  const session = await verifyToken(token);

  if (!session?.userId) {
    return null;
  }

  return session;
});

export const verifySession = cache(async () => {
  const session = await getOptionalSession();

  if (!session?.userId) {
    redirect('/login');
  }

  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await getOptionalSession();

  if (!session?.userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true },
  });
});
