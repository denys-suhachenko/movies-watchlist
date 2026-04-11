import { env } from '@/lib/env';

const baseApiUrl = env.tmdbApiUrl ?? 'https://api.themoviedb.org/3';
const accessToken = process.env.TMDB_API_READ_TOKEN;

export async function baseQuery<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${baseApiUrl}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status}`);
  }

  return res.json();
}
