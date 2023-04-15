import { RecentlyPlayed, SpotifyToken } from '@app/interfaces/spotify';
import { cookies } from 'next/headers';

const SpotifyTimeline = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const token = JSON.parse(
    cookieStore.get('token')?.value as string,
  ) as SpotifyToken;

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
  const data: RecentlyPlayed = (await response.json()) as RecentlyPlayed;

  const track = data.items[2]?.track;
  console.log('RESPONSE', track?.artists);
  console.log('album-artists', track?.album.artists);
  console.log('album-images', track?.album.images);
  return <main>This is the timeline</main>;
};

export default SpotifyTimeline;
