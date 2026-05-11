import { baseQuery } from '@/shared/api/tmdb';

import {
  Actor,
  ActorCreditsResponse,
  ActorExternalLinks,
  ActorListItem,
} from './types';

export type ActorsListResponse = {
  page: number;
  results: ActorListItem[];
  total_pages: number;
  total_results: number;
};

export type ActorImagesResponse = {
  id: number;
  profiles: {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
};

type GetActorsParams = {
  language?: string;
  page?: number;
};

type SearchActorsParams = {
  query: string;
  include_adult?: 'true' | 'false';
  page?: number;
  language?: string;
};

export async function getActors(params?: GetActorsParams) {
  const queryParams = new URLSearchParams({
    page: String(params?.page ?? 1),
  });

  if (params?.language) {
    queryParams.set('language', params.language);
  }

  return baseQuery<ActorsListResponse>(`/person/popular?${queryParams}`);
}

export async function searchActors({
  query,
  page,
  include_adult = 'false',
  language,
}: SearchActorsParams) {
  const queryParams = new URLSearchParams({
    query,
    page: String(page ?? 1),
    include_adult,
  });

  if (language) {
    queryParams.set('language', language);
  }

  return baseQuery<ActorsListResponse>(`/search/person?${queryParams}`);
}

export async function getActor(actorId: string) {
  return baseQuery<Actor>(`/person/${actorId}`);
}

export async function getActorImages(actorId: string) {
  return baseQuery<ActorImagesResponse>(`/person/${actorId}/images`);
}

export async function getActorCredits(actorId: string) {
  return baseQuery<ActorCreditsResponse>(`/person/${actorId}/combined_credits`);
}

export async function getActorMovieCredits(actorId: string) {
  return baseQuery<ActorCreditsResponse>(`/person/${actorId}/movie_credits`);
}

export async function getActorTvCredits(actorId: string) {
  return baseQuery<ActorCreditsResponse>(`/person/${actorId}/tv_credits`);
}

export async function getActorExternalIds(actorId: string) {
  return baseQuery<ActorExternalLinks>(`/person/${actorId}/external_ids`);
}
