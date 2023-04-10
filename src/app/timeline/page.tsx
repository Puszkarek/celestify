import { SpotifyToken } from '@app/interfaces/spotify';
import { cookies } from 'next/headers';

const SpotifyTimeline = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const token = JSON.parse(
    cookieStore.get('token')?.value as string,
  ) as SpotifyToken;

  console.log(token);
  const response = await fetch(
    'https://api.spotify.com/v1/me/player/recently-played',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.access_token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  const data: unknown = await response.json();
  return <main>This is the timeline</main>;
};

export default SpotifyTimeline;
