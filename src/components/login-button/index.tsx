import './style.scss';

import { generateSpotifyLoginURL } from '@app/helpers/spotify-login';

export const LoginButton = (): JSX.Element => {
  const authURL = generateSpotifyLoginURL();

  console.log(authURL);
  return (
    <a className="link shadow" href={authURL}>
      <h3>Login</h3>
    </a>
  );
};
