import { Exception } from '@app/interfaces/error';
import { HTTP_STATUS_CODE } from '@app/interfaces/http';
import { extractException } from '@app/utils/error';
import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { NextApiResponse } from 'next';

export const fetchSpotify = <T>(
  endpoint: string,
  token: string,
): TE.TaskEither<Exception, T> => {
  return pipe(
    TE.tryCatch(async () => {
      const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Throw error
      if (response.status < 200 || response.status > 202) {
        throw new Error(response.statusText);
      }

      const data = (await response.json()) as T;
      return data;
    }, extractException),
  );
};

export const executeTask = async (
  task: TE.TaskEither<Exception, unknown>,
  response: NextApiResponse,
): Promise<void> => {
  const respondsUser = pipe(
    task,
    TE.foldW(
      ({ status, message }) => {
        // TODO: supports multiple errors later
        response.status(status).json({ error: message });
        return T.of(void 0);
      },
      (data) => {
        response.status(HTTP_STATUS_CODE.Ok).json({ data: data });
        return T.of(void 0);
      },
    ),
  );
  await respondsUser();
};
