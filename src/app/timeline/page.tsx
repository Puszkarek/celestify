import { cookies } from "next/headers";
import { FC } from "react";

const SpotifyTimeline: FC = () => {
  const cookieStore = cookies();
  const code = cookieStore.get("code");

  console.log("code", code);

  return <main>This is the timeline</main>;
};

export default SpotifyTimeline;
