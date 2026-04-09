import { env } from '@/lib/env';

export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

type PopularMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type GetMoviesParams = {
  page?: number;
  query?: string;
  year?: string;
};

export type MoviesListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const baseUrl = env.tmdbApiUrl ?? 'https://api.themoviedb.org/3';
const accessToken = process.env.TMDB_API_READ_TOKEN;

// async function tmdbFetch<T>(path: string, init?: RequestInit): Promise<T> {
//   const res = await fetch(`${baseUrl}${path}`, {
//     ...init,
//     headers: {
//       Authorization: `Bearer ${READ_TOKEN}`,
//       'Content-Type': 'application/json',
//       ...(init?.headers ?? {}),
//     },
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     throw new Error(`TMDB request failed: ${res.status}`);
//   }

//   return res.json() as Promise<T>;
// }
