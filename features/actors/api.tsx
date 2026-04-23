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

export async function getActorCredits(actorId: string) {
  return baseQuery<ActorCreditsResponse>(`/person/${actorId}/movie_credits`);
}

export async function getActorExternalIds(actorId: string) {
  return baseQuery<ActorExternalLinks>(`/person/${actorId}/external_ids`);
}
