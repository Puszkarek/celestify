// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HTTP_STATUS_CODE } from '@app/interfaces/http';
import { ResponseData } from '@app/interfaces/response';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = ResponseData<{
  message: string;
}>;

const handler = (
  _request: NextApiRequest,
  response: NextApiResponse<Data>,
): void => {
  response.status(HTTP_STATUS_CODE.Ok).json({ data: { message: 'pong' } });
};

export default handler;
