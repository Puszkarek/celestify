import { stringToBase64 } from '@app/app/utils/encode';
import {
  codecErrorsToException,
  createException,
  extractException,
} from '@app/app/utils/error';
import { safeJSONParse } from '@app/app/utils/json';
import {
  SPOTIFY_API_TOKEN_URL,
  SPOTIFY_AUTHORIZE_URL,
} from '@app/constants/spotify-endpoint';
import { spotifyTokenDecoder } from '@app/decoders/spotify';
import { Exception } from '@app/interfaces/error';
import { SpotifyToken } from '@app/interfaces/spotify';
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import { NextRequest } from 'next/server';

export const generateSpotifyLoginURL = (): string => {
  const urlParameters: Record<string, string> = {
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    scope: 'user-read-email user-top-read',
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
): TE.TaskEither<Exception, SpotifyToken> => {
  const urlParameters = {
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: process.env.SPOTIFY_CALLBACK_URI as string,
  };

  return pipe(
    TE.tryCatch(
      async () => {
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

        return data;
      },
      (error) => {
        console.log('HERE', error);
        return extractException(error);
      },
    ),
    TE.chain(TE.fromPredicate(spotifyTokenDecoder.is, extractException)),
    TE.map(({ access_token, refresh_token, expires_in }) => {
      const millisecondsMultiplier = 1000;
      const expires_in_milliseconds = expires_in * millisecondsMultiplier;

      // Get the date it expires in milliseconds
      const expires_in_date = new Date(
        Date.now() + expires_in_milliseconds,
      ).getTime();

      return { access_token, refresh_token, expires_in: expires_in_date };
    }),
  );
};

export const validateSpotifyToken = (
  request: NextRequest,
): E.Either<Exception, SpotifyToken> => {
  return pipe(
    request.cookies.get('token'),
    O.fromNullable,
    O.map(({ value }) => value),
    O.chain(safeJSONParse),
    E.fromOption(() => createException('No token found')),
    E.chain(
      // TODO: create a `decodeValue` function that takes a decoder and returns a function that takes a value and returns an Either
      flow(spotifyTokenDecoder.decode, E.mapLeft(codecErrorsToException)),
    ),
    // TODO: request refresh token if token has expired
    E.filterOrElse(
      (value) => value.expires_in > Date.now(),
      () => createException('Token has expired'),
    ),
  );
};
