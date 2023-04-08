import { SpotifyError, SpotifyToken } from "@app/interfaces/spotify";

export const isSpotifyError = (data: unknown): data is SpotifyError => {
  return (
    data instanceof Object && "error" in data && typeof data.error === "string"
  );
};

export const isSpotifyToken = (data: unknown): data is SpotifyToken => {
  return (
    data instanceof Object &&
    "access_token" in data &&
    typeof data.access_token === "string" &&
    "refresh_token" in data &&
    typeof data.refresh_token === "string" &&
    "expires_in" in data &&
    typeof data.expires_in === "number"
  );
};
