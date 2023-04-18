import {
  spotifyErrorDecoder,
  spotifyMostPlayedTracksDecoder,
} from '@app/app/decoders/spotify';
import { executeTask, fetchSpotify } from '@app/helpers/spotify-api';
import { Exception } from '@app/interfaces/error';
import { HTTP_STATUS_CODE } from '@app/interfaces/http';
import { SpotifyMostPlayedTracks } from '@app/interfaces/spotify';
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as t from 'io-ts';
import type { NextApiRequest, NextApiResponse } from 'next';

import { codecErrorsToException, createException } from '../../app/utils/error';
import { ResponseData } from '../../interfaces/response';

const responseDecoder = t.union([
  spotifyMostPlayedTracksDecoder,
  spotifyErrorDecoder,
]);

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData<SpotifyMostPlayedTracks>>,
): Promise<void> => {
  const task = pipe(
    request.headers.authorization,
    E.fromNullable(
      createException('Unauthorized', HTTP_STATUS_CODE.Unauthorized),
    ),
    TE.fromEither,
    TE.chain((code) => fetchSpotify('me/player/recently-played', code)),
    TE.chain(
      flow(
        responseDecoder.decode,
        TE.fromEither,
        TE.mapLeft(codecErrorsToException),
      ),
    ),
  );

  await executeTask(task, response);
};

export default handler;
