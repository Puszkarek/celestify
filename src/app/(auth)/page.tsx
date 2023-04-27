import './style.scss';

import { GalaxyHandler } from '@app/components/galaxy-handler';
import Icon from '@app/components/icon';
import { CelestialBodiesExplanation } from '@app/components/planets-explanation';
import { spotifyTokenDecoder } from '@app/decoders/spotify';
import { groupFeatureByArtist } from '@app/helpers/feature-by-artist';
import { generateGalaxy } from '@app/helpers/galaxy';
import { getTopItems } from '@app/helpers/get-top-items';
import { ICON_NAME } from '@app/interfaces/icon';
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
    <div className="home-container">
      <header className="home-header">
        {/*   <div aria-hidden className="home-planet"></div>
        <div aria-hidden className="home-planet"></div>
        <div aria-hidden className="home-planet"></div>
        <div aria-hidden className="home-planet"></div> */}
        <h2 className="home-title shadow">
          <span className="text-primary-green block">Behold</span> Your Unique{' '}
          <span className="text-primary-yellow">Galaxy</span> Awaits!
        </h2>
      </header>
      <main className="home-main-container">
        <div>
          <GalaxyHandler galaxy={response.right}></GalaxyHandler>
        </div>

        <section className="share-container shadow">
          <p className="section-text">
            Share your Galaxy with friends, or download it as a keepsake! Show
            off your stellar taste in music and let others explore your personal
            universe.
          </p>
          <div className="share-buttons-container">
            <button className="download-button shadow shadow-interacive">
              <Icon name={ICON_NAME.download} size={30}></Icon>
            </button>
            <button className="share-button shadow shadow-interacive">
              <Icon name={ICON_NAME.share} size={30}></Icon>
            </button>
          </div>
        </section>

        <section className="galaxy-list-container shadow">
          <h2 className="section-title text-primary-purple">
            So... What do all these things mean?
          </h2>
          <CelestialBodiesExplanation></CelestialBodiesExplanation>
        </section>

        <section className="galaxy-explanation-container shadow">
          <h2 className="section-title text-primary-magenta">
            But how do they find this stuff out?
          </h2>
          <p className="section-text">
            We use an algorithm that analyzes your listening song history and
            assigns each artist a{' '}
            <span className="text-primary-blue">planet</span> based on an
            average factors like{' '}
            <span className="text-primary-green">popularity</span>,
            <span className="text-secondary-yellow">mood</span>,{' '}
            <span className="text-primary-pink">danceability</span>, etc. The
            size, color, and position of the planets in your{' '}
            <span className="text-primary-purple">galaxy</span> represent your
            <span className="text-primary-red">unique</span> listening habits
            and preferences. Get ready to explore your musical universe!
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
