"use client";

import { FC } from "react";

const loginWithSpotify = async (): Promise<void> => {
  await fetch("api/login");
  console.log("login....");
};

export const LoginButton: FC = () => {
  return (
    <button onClick={loginWithSpotify}>
      <h3>Login With Spotify</h3>
    </button>
  );
};
