import "./style.scss";

import { generateURL } from "@app/helpers/spotify";
import { FC } from "react";

export const LoginButton: FC = () => {
  const authURL = generateURL();

  return (
    <a className="link shadow" href={authURL}>
      <h3>Login With Spotify</h3>
    </a>
  );
};
