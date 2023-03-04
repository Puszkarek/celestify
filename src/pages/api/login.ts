/* eslint-disable camelcase */
import { URLSearchParams } from "node:url";

import { ResponseData } from "@app/interfaces/response";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = ResponseData<{
  message: string;
}>;

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
): void => {
  const redirectURL = "http://localhost:3000/spotify/callback";

  const urlParameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    scope:
      "user-read-currently-playing user-read-email user-read-recently-played user-top-read",
    redirect_uri: redirectURL,
    // State: 'return_to=',
    show_dialog: "true",
  });

  response.redirect(
    `https://accounts.spotify.com/authorize?${urlParameters.toString()}`
  );
};

export default handler;
