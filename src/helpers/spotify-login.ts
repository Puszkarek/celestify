import {
  SPOTIFY_API_TOKEN_URL,
  SPOTIFY_AUTHORIZE_URL,
} from '@app/constants/spotify-endpoint';
import { spotifyTokenDecoder } from '@app/decoders/spotify';
import { Exception } from '@app/interfaces/error';
import { SpotifyToken } from '@app/interfaces/spotify';
import { stringToBase64 } from '@app/utils/encode';
import {
  codecErrorsToException,
  createException,
  extractException,
} from '@app/utils/error';
import { safeJSONParse } from '@app/utils/json';
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

  console.log('3.1 - URL PARAMETERS', urlParameters);
  return pipe(
    TE.tryCatch(
      async () => {
        console.log(
          '3 -  URLs',
          SPOTIFY_API_TOKEN_URL,
          process.env.SPOTIFY_CLIENT_ID,
          process.env.SPOTIFY_CLIENT_SECRET,
        );

        const url = `${SPOTIFY_API_TOKEN_URL}?${new URLSearchParams(
          urlParameters,
        ).toString()}`;

        const response = await fetch(url, {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${stringToBase64(
              `${process.env.SPOTIFY_CLIENT_ID as string}:${
                process.env.SPOTIFY_CLIENT_SECRET as string
              }`,
            )}`,
          },
        });
        console.log('3.1. RESPONSE', response.status, response.statusText);
        const data: unknown = await response.json();

        console.log('3.1.1 PARSED DATA', data);
        return data;
      },
      (error) => {
        console.error('3. SOMETHING HAPPENS', error);
        return extractException(error);
      },
    ),
    TE.chain(TE.fromPredicate(spotifyTokenDecoder.is, extractException)),
    TE.map(({ access_token, refresh_token, expires_in }) => {
      console.log('3. FINAAAAAAAAAAAAAAAAAAAAAAAAl');
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
