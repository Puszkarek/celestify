"use client";

import { useSearchParams } from "next/navigation";
import { FC } from "react";

const SpotifyCallback: FC = () => {
  const router = useSearchParams();
  console.log(router.get("code"));

  return <main>IDK</main>;
};

export default SpotifyCallback;
