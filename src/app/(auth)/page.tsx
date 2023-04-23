import './style.scss';

import { GalaxyHandler } from '@app/components/galaxy-handler';
import { spotifyTokenDecoder } from '@app/decoders/spotify';
import { groupFeatureByArtist } from '@app/helpers/feature-by-artist';
import { generateGalaxy } from '@app/helpers/galaxy';
import { getTopItems } from '@app/helpers/get-top-items';
import { SpotifyAudioFeatures } from '@app/interfaces/spotify';
import { createException } from '@app/utils/error';
import { safeJSONParse } from '@app/utils/json';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import { cookies } from 'next/headers';

const Home = async (): Promise<JSX.Element> => {
  const cookiesStore = cookies();
  const rawToken = cookiesStore.get('token')?.value;

  const task = pipe(
    rawToken,
    O.fromNullable,
    O.chain(safeJSONParse),
    O.filter(spotifyTokenDecoder.is),
    O.map(({ access_token }) => access_token),
    TE.fromOption(() => createException('Invalid token')),
    TE.chain(getTopItems),
    TE.map(({ tracks, features }) => {
      return tracks.map((track) => ({
        metadata: track,
        features: features.find(
          (feature) => feature.id === track.id,
        ) as SpotifyAudioFeatures,
      }));
    }),
    TE.map((tracksWithFeatures) => groupFeatureByArtist(tracksWithFeatures)),
    TE.map(generateGalaxy),
  );

  const response = await task();

  if (E.isLeft(response)) {
    return <main>Not logged in</main>;
  }

  return (
    <>
      <main className="home-container">
        {/* TODO-n: some header */}
        {/* TODO-n: might some text */}

        <div>
          <GalaxyHandler galaxy={response.right}></GalaxyHandler>
        </div>
        {/* TODO-n: some text about sharing */}
        {/* TODO: share / download buttons  */}
      </main>
    </>
  );
};

export default Home;
