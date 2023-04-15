/* eslint-disable max-lines-per-function */
import { spotifyTokenDecoder } from '@app/app/decoders/spotify';
import { codecErrorsToException, createException } from '@app/app/utils/error';
import { safeJSONParse } from '@app/app/utils/json';
import { LOGGER } from '@app/app/utils/logger';
import { TOKEN_MAX_AGE_IN_SECONDS } from '@app/constants/token';
import { getSpotifyAccessToken } from '@app/helpers/spotify-login';
import { getHostURI } from '@app/helpers/url-generator';
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { NextConfig } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line max-statements
export const middleware = async (
  request: NextRequest,
): Promise<NextResponse> => {
  const host = getHostURI(request);

  const homeURL = `${host}/`;
  const loginURL = `${host}/login`;

  switch (request.nextUrl.pathname) {
    case '/spotify/callback': {
      const task = pipe(
        request.nextUrl.searchParams.get('code'),
        E.fromNullable(createException('No code Found')),
        TE.fromEither,
        TE.chain(getSpotifyAccessToken),
        TE.map((token) => {
          // Set the cookie and redirect to /home
          const nextResponse = NextResponse.redirect(homeURL);
          nextResponse.cookies.set('token', JSON.stringify(token), {
            secure: process.env.NODE_ENV === 'production', // Set 'secure' only in production
            sameSite: 'lax', // Recommended to prevent CSRF attacks
            maxAge: TOKEN_MAX_AGE_IN_SECONDS,
          });

          return nextResponse;
        }),
        TE.getOrElse((error) => {
          console.error('middleware', error);
          return T.of(NextResponse.redirect(loginURL));
        }),
      );

      return await task();
    }
    case '/login': {
      // TODO: handle expired cookies
      request.cookies.delete('spotify_token');
      const currentCookie = request.cookies.get('code')?.value;
      if (currentCookie) {
        console.warn('Cookie found, redirecting to the Home page');
        return NextResponse.redirect(homeURL);
      }

      const response = NextResponse.next();

      return response;
    }
    case '/': {
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
        E.filterOrElse(
          // TODO: request refresh token if token has expired
          (value) => value.expires_in > Date.now(),
          () => createException('Token has expired'),
        ),
        E.fold(
          // Delete cookie and redirect to login page
          (error) => {
            LOGGER.warn(error.message);

            request.cookies.delete('token');
            return NextResponse.redirect(loginURL);
          },
          () => {
            return NextResponse.next();
          },
        ),
      );
    }
  }

  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config: NextConfig = {
  matcher: ['/spotify/callback', '/home', '/'],
};
