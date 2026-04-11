import { env } from '@/lib/env';

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Collection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieListItem = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

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

const baseApiUrl = env.tmdbApiUrl ?? 'https://api.themoviedb.org/3';
const accessToken = process.env.TMDB_API_READ_TOKEN;

async function baseQuery<T>(path: string, init?: RequestInit): Promise<T> {
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

type CreditPerson = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
};

export type CastMember = CreditPerson & {
  cast_id: number;
  character: string;
  order: number;
};

export type CrewMember = CreditPerson & {
  department: string;
  job: string;
};

export type MovieCredits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};
