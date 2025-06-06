export const SPOTIFY_BASE_URL = 'https://accounts.spotify.com' as const;
export const SPOTIFY_AUTHORIZE_URL = `${SPOTIFY_BASE_URL}/authorize` as const;

// * APIs
export const SPOTIFY_API_URL = `${SPOTIFY_BASE_URL}/api` as const;
export const SPOTIFY_API_TOKEN_URL = `${SPOTIFY_API_URL}/token` as const;
