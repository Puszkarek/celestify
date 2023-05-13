import './style.scss';

import { PosterHandler } from '@app/components/poster-handler';
import { spotifyTokenDecoder, timeRangeDecoder } from '@app/decoders/spotify';
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
import Link from 'next/link';

const isActive = (timeRange: string, current: string): string => {
  return timeRange === current ? 'active-link' : '';
};

const Home = async ({
  params,
}: {
  params: { time_range: string };
}): Promise<JSX.Element> => {
  const cookiesStore = cookies();
  const rawToken = cookiesStore.get('token')?.value;

  const task = pipe(
    rawToken,
    O.fromNullable,
    O.chain(safeJSONParse),
    O.filter(spotifyTokenDecoder.is),
    O.map(({ access_token }) => access_token),
    TE.fromOption(() => createException('Invalid token')),
    TE.bindTo('token'),
    TE.bind('timeRange', () =>
      pipe(
        params.time_range,
        TE.fromPredicate(timeRangeDecoder.is, () =>
          createException('Invalid time range'),
        ),
      ),
    ),
    TE.chain(({ timeRange, token }) => getTopItems(token, timeRange)),
    TE.map(({ tracks, features }) =>
      tracks.map((track) => ({
        metadata: track,
        features: features.find(
          (feature) => feature.id === track.id,
        ) as SpotifyAudioFeatures,
      })),
    ),
    TE.map((tracksWithFeatures) => groupFeatureByArtist(tracksWithFeatures)),
    TE.map(generateGalaxy),
  );

  const response = await task();

  if (E.isLeft(response)) {
    return <main>Not logged in</main>;
  }

  return (
    <div className="home-container">
      <main className="home-main-container">
        <div className="poster-buttons shadow">
          <Link
            href="poster/short_term"
            className={`poster-button ${isActive(
              'short_term',
              params.time_range,
            )}`}
          >
            Last Month
          </Link>
          <Link
            href="poster/medium_term"
            className={`poster-button ${isActive(
              'medium_term',
              params.time_range,
            )}`}
          >
            Last 6 Months
          </Link>
          <Link
            href="poster/long_term"
            className={`poster-button ${isActive(
              'long_term',
              params.time_range,
            )}`}
          >
            All Time
          </Link>
        </div>

        <PosterHandler galaxy={response.right}></PosterHandler>
        {/* 
        <section className="galaxy-list-container shadow">
          <h2 className="section-title text-primary-purple">
            So... What do all these things mean?
          </h2>
          <CelestialBodiesExplanation></CelestialBodiesExplanation>
        </section> */}

        <section className="galaxy-explanation-container shadow">
          <h2 className="section-title text-primary-magenta">
            How does this stuff work?
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
            <span className="text-primary-purple">galaxy</span> represent your{' '}
            <span className="text-primary-red">unique</span> listening habits
            and preferences. Get ready to explore your musical universe!
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
