import { isSpotifyError, isSpotifyToken } from '@app/app/guards/spotify';
import { stringToBase64 } from '@app/app/utils/encode';
import { extractError } from '@app/app/utils/error';
import {
  SPOTIFY_API_TOKEN_URL,
  SPOTIFY_AUTHORIZE_URL,
} from '@app/constants/spotify-endpoint';
import { SpotifyToken } from '@app/interfaces/spotify';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';

export const generateSpotifyLoginURL = (): string => {
  const urlParameters: Record<string, string> = {
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    scope: 'user-read-email user-read-recently-played',
    redirect_uri: process.env.SPOTIFY_CALLBACK_URI as string,
  };

  return pipe(
    new URLSearchParams(urlParameters),
    (searchParameters) =>
      `${SPOTIFY_AUTHORIZE_URL}?${searchParameters.toString()}`,
  );
};

export const getSpotifyAccessToken = (
  authorizationCode: string,
): TE.TaskEither<Error, SpotifyToken> => {
  const urlParameters = {
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: process.env.SPOTIFY_CALLBACK_URI as string,
  };

  return TE.tryCatch(async () => {
    const response = await fetch(SPOTIFY_API_TOKEN_URL, {
      method: 'POST',
      body: new URLSearchParams(urlParameters),
      headers: {
        Authorization: `Basic ${stringToBase64(
          `${process.env.SPOTIFY_CLIENT_ID as string}:${
            process.env.SPOTIFY_CLIENT_SECRET as string
          }`,
        )}`,
      },
    });
    const data: unknown = await response.json();

    console.log('spotify data', data);
    if (isSpotifyError(data)) {
      throw new Error(data.error_description);
    }

    if (!isSpotifyToken(data)) {
      throw extractError(data);
    }

    const { access_token, refresh_token, expires_in } = data;
    return { access_token, refresh_token, expires_in };
  }, extractError);
};
