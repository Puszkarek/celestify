import { isString } from '@app/app/guards/primitives';
import { getSpotifyAccessToken } from '@app/helpers/spotify-login';
import { HTTP_STATUS_CODE } from '@app/interfaces/http';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

import { ResponseData } from '../../interfaces/response';

type Data = {
  message: string;
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData<Data>>,
): Promise<void> => {
  if (request.method !== 'POST') {
    response
      .status(HTTP_STATUS_CODE.MethodNotAllowed)
      .json({ data: { message: 'Method Not Allowed' } });
    return;
  }
  // TODO: remove condition
  const code = request.headers.authorization;
  if (!code) {
    response
      .status(HTTP_STATUS_CODE.Unauthorized)
      .json({ data: { message: 'Unauthorized' } });
    return;
  }

  const nextCookies = cookies();

  const task = pipe(
    code,
    E.fromNullable(new Error('No code found')),
    E.map((authorizationCode) => ({ authorizationCode })),
    E.bind('verifier', () =>
      pipe(
        request.headers.verifier,
        E.fromPredicate(isString, () => new Error('No verifier found')),
      ),
    ),
    TE.fromEither,
    TE.chain(getSpotifyAccessToken),
    TE.fold(
      (error) => {
        console.error('[login-error]', error);
        return T.of('error on create token');
      },
      (token) => {
        // Set the cookie and redirect to /timeline
        nextCookies.set({
          name: 'token',
          value: JSON.stringify(token),
        });

        return T.of('success on create token');
      },
    ),
  );

  const message = await task();

  response.status(HTTP_STATUS_CODE.Ok).json({ data: { message: message } });
};

export default handler;
