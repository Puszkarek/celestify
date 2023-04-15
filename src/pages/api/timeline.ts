// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HTTP_STATUS_CODE } from '@app/interfaces/http';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ResponseData } from '../../interfaces/response';

type Data = {
  message: string;
};

const fetchSpotify = async (
  endpoint: string,
  token: string,
): Promise<unknown> => {
  const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (await response.json()) as unknown;
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData<Data>>,
): Promise<void> => {
  const code = request.headers.authorization;
  if (!code) {
    response
      .status(HTTP_STATUS_CODE.Unauthorized)
      .json({ data: { message: 'Unauthorized' } });
    return;
  }

  const results = await fetchSpotify('me/player/recently-played', code);
  console.log('AAAAAAAAAAAAA', results);
  response.status(HTTP_STATUS_CODE.Ok).json({ data: { message: 'pong' } });
};

export default handler;
