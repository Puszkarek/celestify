import { cookies } from "next/headers";

const SpotifyTimeline = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value as string;

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data: unknown = await response.json();
  console.log('data',data);
  return <main>This is the timeline</main>;
};

export default SpotifyTimeline;
