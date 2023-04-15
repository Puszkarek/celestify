import {
  spotifyErrorDecoder,
  spotifyRecentlyPlayedDecoder,
} from '@app/app/decoders/spotify';
import { executeTask, fetchSpotify } from '@app/helpers/spotify-api';
import { Exception } from '@app/interfaces/error';
import { HTTP_STATUS_CODE } from '@app/interfaces/http';
import { RecentlyPlayed } from '@app/interfaces/spotify';
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as t from 'io-ts';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createException, extractException } from '../../app/utils/error';
import { ResponseData } from '../../interfaces/response';

const responseDecoder = t.union([
  spotifyRecentlyPlayedDecoder,
  spotifyErrorDecoder,
]);

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData<RecentlyPlayed>>,
): Promise<void> => {
  const task: TE.TaskEither<Exception, RecentlyPlayed> = pipe(
    request.headers.authorization,
    E.fromNullable(
      createException('Unauthorized', HTTP_STATUS_CODE.Unauthorized),
    ),
    TE.fromEither,
    TE.chain((code) => fetchSpotify('me/player/recently-played', code)),
    TE.chain(
      flow(responseDecoder.decode, TE.fromEither, TE.mapLeft(extractException)),
    ),
    TE.chain(
      TE.fromPredicate(spotifyRecentlyPlayedDecoder.is, extractException),
    ),
  );

  await executeTask(task, response);
};

export default handler;
