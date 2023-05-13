// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HTTP_STATUS_CODE } from '@app/interfaces/http';
import { ResponseData } from '@app/interfaces/response';
import { createException } from '@app/utils/error';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = ResponseData<{
  message: string;
}>;

const handler = (
  apiRequest: NextApiRequest,
  response: NextApiResponse<Data>,
): void => {
  const either = pipe(
    apiRequest,
    E.fromPredicate(
      (request) => request.method === 'POST',
      () => createException('Only POST requests allowed', 405),
    ),
    E.map((request) => {
      for (const cookie of Object.keys(request.cookies)) {
        response.setHeader('Set-Cookie', `${cookie}=; Path=/; Max-Age=0`);
      }

      return { message: 'Logged out successfully' };
    }),
  );

  if (E.isLeft(either)) {
    const exception = either.left;
    response
      .status(exception.status)
      .send({ data: { message: exception.message } });
  } else {
    const { message } = either.right;
    response.status(HTTP_STATUS_CODE.Ok).send({ data: { message } });
  }
};

export default handler;
