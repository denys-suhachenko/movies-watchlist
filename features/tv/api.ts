import { baseQuery } from '@/shared/api/tmdb';

import { TvShow, TvShowImagesList, TvShowListItem } from './types';
import { CastMember, CrewMember } from '@/shared/lib/types';

type GetTvShowsParams = {
  query?: string;
  page?: number;
  year?: string;
  genre?: string;
};

type TvShowsListResponse = {
  page: number;
  results: TvShowListItem[];
  total_pages: number;
  total_results: number;
};

type SearchTvShowsParams = {
  query: string;
  page?: number;
  year?: string;
};

export type TvShowCredits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export async function getTvShows(params?: GetTvShowsParams) {
  const queryParams = new URLSearchParams({
    page: String(params?.page ?? 1),
  });

  if (params?.year) {
    queryParams.set('year', params.year);
  }

  if (params?.genre) {
    queryParams.set('with_genres', params.genre);
  }

  return baseQuery<TvShowsListResponse>(`/discover/tv?${queryParams}`);
}

export async function searchTvShows({
  query,
  page,
  year,
}: SearchTvShowsParams) {
  const queryParams = new URLSearchParams({
    query,
    page: String(page ?? 1),
  });

  if (year) {
    queryParams.set('year', year);
  }

  return baseQuery<TvShowsListResponse>(`/search/tv?${queryParams}`);
}

export async function fetchTvShows(params?: GetTvShowsParams) {
  return params?.query
    ? searchTvShows({
        query: params.query,
        page: params.page,
        year: params.year,
      })
    : getTvShows(params);
}

export async function getTvShow(showId: string) {
  return baseQuery<TvShow>(`/tv/${showId}`);
}

export async function getTvShowCredits(showId: string) {
  return baseQuery<TvShowCredits>(`tv/${showId}/credits`);
}

export async function getTvShowRecommendations(showId: string) {
  return baseQuery<TvShowsListResponse>(`/tv/${showId}/recommendations`);
}

export async function getTvShowImages(showId: string) {
  return baseQuery<TvShowImagesList>(`/tv/${showId}/images`);
}

export async function getTvShowSeason(showId: string, seasonNumber: string) {
  return baseQuery<TvShowImagesList>(`/tv/${showId}/season/${seasonNumber}`);
}
