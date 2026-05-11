import { baseQuery } from '@/shared/api/tmdb';

import { Movie, MovieCredits, MovieListItem } from './types';
import { Genre } from '@/shared/lib/types';

type MoviesListResponse = {
  page: number;
  results: MovieListItem[];
  total_pages: number;
  total_results: number;
};

type GetMoviesParams = {
  query?: string;
  page?: number;
  year?: string;
  genre?: string;
};

type SearchMoviesParams = {
  query: string;
  page?: number;
  year?: string;
};

export async function getMovies(params?: GetMoviesParams) {
  const queryParams = new URLSearchParams({
    page: String(params?.page ?? 1),
  });

  if (params?.year) {
    queryParams.set('year', params.year);
  }

  if (params?.genre) {
    queryParams.set('with_genres', params.genre);
  }

  return baseQuery<MoviesListResponse>(`/discover/movie?${queryParams}`);
}

export async function searchMovies({ query, page, year }: SearchMoviesParams) {
  const queryParams = new URLSearchParams({
    query,
    page: String(page ?? 1),
  });

  if (year) {
    queryParams.set('year', year);
  }

  return baseQuery<MoviesListResponse>(`/search/movie?${queryParams}`);
}

export async function fetchMovies(params?: GetMoviesParams) {
  return params?.query
    ? searchMovies({
        query: params.query,
        page: params.page,
        year: params.year,
      })
    : getMovies(params);
}

export async function getGenres(lang = 'en') {
  return baseQuery<{ genres: Genre[] }>(`/genre/movie/list?language=${lang}`);
}

export async function getMovie(movieId: string) {
  return baseQuery<Movie>(`/movie/${movieId}`);
}

export async function getMovieCredits(movieId: string) {
  return baseQuery<MovieCredits>(`movie/${movieId}/credits`);
}

export async function getMovieRecommendations(movieId: string) {
  return baseQuery<MoviesListResponse>(`/movie/${movieId}/recommendations`);
}

export async function fetchUpcomingMovies() {
  return baseQuery<MoviesListResponse>(`/movie/upcoming`);
}
