import { isSpotifyError, isSpotifyToken } from "@app/app/guards/spotify";
import { extractError } from "@app/app/utils/error";
import {
  SPOTIFY_API_TOKEN_URL,
  SPOTIFY_AUTHORIZE_URL,
} from "@app/constants/spotify-endpoint";
import { SpotifyToken } from "@app/interfaces/spotify";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

export const generateSpotifyLoginURL = (): string => {
  const urlParameters: Record<string, string> = {
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    scope:
      "user-read-currently-playing user-read-email user-read-recently-played user-top-read",
    redirect_uri: process.env.SPOTIFY_CALLBACK_URI as string,
    // State: 'return_to=',
    show_dialog: "true",
  };

  return pipe(
    new URLSearchParams(urlParameters),
    (searchParameters) =>
      `${SPOTIFY_AUTHORIZE_URL}?${searchParameters.toString()}`
  );
};

export const getSpotifyAccessToken = (
  authorizationCode: string
): TE.TaskEither<Error, SpotifyToken> => {
  const urlParameters: Record<string, string> = {
    grant_type: "authorization_code",
    code: authorizationCode,
    redirect_uri: process.env.SPOTIFY_CALLBACK_URI as string,
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
  };

  const taskEither = TE.tryCatch(async () => {
    const response = await fetch(SPOTIFY_API_TOKEN_URL, {
      method: "POST",
      body: new URLSearchParams(urlParameters),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data: unknown = await response.json();

    if (isSpotifyError(data)) {
      throw new Error(data.error_description);
    }

    if (!isSpotifyToken(data)) {
      throw extractError(data);
    }

    const { access_token, refresh_token, expires_in } = data;
    return { access_token, refresh_token, expires_in };
  }, extractError);

  return taskEither;
};
