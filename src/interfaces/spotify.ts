export type SpotifyError = {
  error: string;
  error_description: string;
};

export type SpotifyToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
