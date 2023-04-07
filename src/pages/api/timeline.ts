// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HTTP_STATUS_CODE } from "@app/interfaces/http";
import type { NextApiRequest, NextApiResponse } from "next";

import { ResponseData } from "../../interfaces/response";

type Data = {
  message: string;
};

const token = "YOUR_SPOTIFY_TOKEN";

const fetchWebApi = async (
  endpoint: string,
  method: string
): Promise<unknown> => {
  const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
  });
  return (await response.json()) as unknown;
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData<Data>>
): Promise<void> => {
  console.log(request.headers);
  const results = await fetchWebApi("me/player/recently-played", "GET");
  console.log(results);
  response.status(HTTP_STATUS_CODE.Ok).json({ data: { message: "pong" } });
};

export default handler;
