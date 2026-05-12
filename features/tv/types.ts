import {
  CastMember,
  CrewMember,
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from '@/shared/lib/types';
import { TMDBImage } from '@/shared/types/media';

export type TvShowSeason = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
};

export type TvShow = {
  adult: boolean;
  backdrop_path: string | null;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  name: string;
  next_episode_to_air: null | object;
  networks: ProductionCompany[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: TvShowSeason[];
  softcore: boolean;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type TvShowListItem = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  softcore: boolean;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type TvShowImagesList = {
  id: number;
  backdrops: TMDBImage[];
  logos: TMDBImage[];
  posters: TMDBImage[];
};

export type TvShowEpisode = {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  show_id: number;
  air_date: string;
  still_path: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  crew: CrewMember[];
  guest_stars: CastMember[];
  production_code: string;
};

export type TvShowSeasonDetails = {
  _id: string;
  id: number;
  name: string;
  overview: string;
  air_date: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  episodes: TvShowEpisode[];
};
