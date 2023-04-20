import { TOKEN_MAX_AGE_IN_SECONDS } from '@app/constants/token';
import {
  getSpotifyAccessToken,
  validateSpotifyToken,
} from '@app/helpers/spotify-login';
import { getHostURI } from '@app/helpers/url-generator';
import { createException } from '@app/utils/error';
import { LOGGER } from '@app/utils/logger';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { NextConfig } from 'next';
import { NextRequest, NextResponse } from 'next/server';

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
      return pipe(
        validateSpotifyToken(request),
        E.fold(
          // User can access `login` page
          () => {
            // Make sure to delete the cookie if it exists
            request.cookies.delete('token');

            return NextResponse.next();
          },
          // User is already logged in, redirect to `home` page
          () => {
            return NextResponse.redirect(homeURL);
          },
        ),
      );
    }
    case '/': {
      return pipe(
        validateSpotifyToken(request),
        E.fold(
          // User's Token is invalid, delete it and redirect to `login` page
          (error) => {
            LOGGER.warn(error.message);

            request.cookies.delete('token');
            return NextResponse.redirect(loginURL);
          },
          // User can access `home` page
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
  matcher: ['/spotify/callback', '/', '/login'],
};
