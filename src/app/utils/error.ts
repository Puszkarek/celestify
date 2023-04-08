import { isSpotifyError } from "@app/app/guards/spotify";

export const extractError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  if (isSpotifyError(error)) {
    return new Error(error.error_description);
  }

  return new Error("Unknown error");
};
