/* eslint-disable camelcase */
export const generateURL = (): string => {
  // TODO: get the host
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

  return `https://accounts.spotify.com/authorize?${urlParameters.toString()}`;
};
