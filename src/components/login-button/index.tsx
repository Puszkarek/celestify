import './style.scss';

import { generateSpotifyLoginURL } from '@app/helpers/spotify-login';

export const LoginButton = (): JSX.Element => {
  const authURL = generateSpotifyLoginURL();

  return (
    <a className="login-button shadow shadow-interactive" href={authURL}>
      <h3>Login</h3>
    </a>
  );
};
