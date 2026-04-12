export const env = {
  tmdbApiUrl: process.env.TMDB_BASE_URL,
  tmdbImageUrl: process.env.TMDB_IMAGE_BASE_URL,
  tmdbAccessToken: process.env.TMDB_API_READ_TOKEN,
  databaseUrl: process.env.DATABASE_URL,
};

if (!env.databaseUrl) {
  throw new Error('Missing DATABASE_URL');
}

if (!env.tmdbApiUrl) {
  throw Error('Missing TMDB_BASE_URL!');
}

if (!env.tmdbAccessToken) {
  throw new Error('Missing TMDB_API_READ_TOKEN');
}
