import { safeJSONParse } from '@app/app/utils/json';
import { RecentlyPlayed, SpotifyToken } from '@app/interfaces/spotify';
import { cookies } from 'next/headers';

const SpotifyTimeline = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();

  const rawToken = cookieStore.get('token')?.value as string;

  const token = safeJSONParse<SpotifyToken>(rawToken);

  const searchParameters = new URLSearchParams({
    limit: '50',
  });

  const fetchRecently = async (): Promise<RecentlyPlayed['items']> => {
    const resultItems: Array<RecentlyPlayed['items']> = [];

    let url = `https://api.spotify.com/v1/me/player/recently-played?${searchParameters.toString()}`;

    for (let requestIndex = 0; requestIndex < 2; requestIndex++) {
      console.log('----------------');
      console.log('URL TO REQUEST', url);
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token?.access_token}`, // TODO: don't make the request if the token doesn't exist
          'Content-Type': 'application/json',
        },
      });

      const recentlyPlayed: RecentlyPlayed =
        // eslint-disable-next-line no-await-in-loop
        (await response.json()) as RecentlyPlayed;

      const { items, ...itemsContext } = recentlyPlayed;

      console.log('items to add', items.length);
      resultItems.push(items);

      console.log('CURRENT', itemsContext.href);
      console.log('NEXT', itemsContext.next);
      url = itemsContext.next;
    }

    return resultItems.flat();
  };

  const results = await fetchRecently();

  console.log(
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nresults length',
    results.length,
  );
  results.map((data) => {
    return {
      name: data.track.name,
      album: data.track.album.name,
      artist: data.track.artists[0]?.name,
      playedAt: data.played_at,
    };
  });

  return <main>This is the timeline</main>;
};

export default SpotifyTimeline;
