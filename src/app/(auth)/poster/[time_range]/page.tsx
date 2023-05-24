import './style.scss';

import { AdBanner } from '@app/components/ad-banner';
import { PosterHandler } from '@app/components/poster-handler';
import { Stats } from '@app/components/stats';
import { spotifyTokenDecoder, timeRangeDecoder } from '@app/decoders/spotify';
import { groupFeatureByArtist } from '@app/helpers/feature-by-artist';
import { generateGalaxy } from '@app/helpers/galaxy';
import { getTopItems, getUserData } from '@app/helpers/spotify-requests';
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
    TE.bind('userData', ({ token }) => getUserData(token)),
    TE.bind('galaxy', ({ timeRange, token }) =>
      pipe(
        getTopItems(token, timeRange),
        TE.map(({ tracks, features }) => {
          return tracks.map((track) => ({
            metadata: track,
            features: features.find(
              // eslint-disable-next-line max-nested-callbacks
              (feature) => feature.id === track.id,
            ) as SpotifyAudioFeatures,
          }));
        }),
        TE.map((tracksWithFeatures) =>
          groupFeatureByArtist(tracksWithFeatures),
        ),
        TE.map(generateGalaxy),
      ),
    ),
  );

  const response = await task();

  if (E.isLeft(response)) {
    return (
      <main>
        {/* TODO: move to a shared component */}
        <div className="warning-message-container">
          <div className="warning-message-icon">¯\(°_o)/¯</div>
          <div className="warning-message-content shadow">
            <div className="warning-message">
              Hey, sorry! Something went wrong :/
            </div>
            <div className="warning-message">
              Try to refresh the page or come back later!
            </div>
          </div>
        </div>
      </main>
    );
  }

  const { galaxy, userData } = response.right;

  if (galaxy.celestialBodies.length === 0) {
    return (
      <main>
        {/* TODO: move to a shared component */}
        <div className="warning-message-container">
          <div className="warning-message-icon">꒰ ꒡⌓꒡꒱</div>
          <div className="warning-message-content shadow">
            <div className="warning-message">
              Looks that you had never ever listened to a single song on Spotify
              :(
            </div>
            <div className="warning-message">
              Go listen to some music and come back later!
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="home-container">
      <main className="home-main-container">
        <AdBanner
          data-ad-slot="7469414338"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></AdBanner>
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

        <PosterHandler galaxy={galaxy} userData={userData}></PosterHandler>

        <AdBanner
          data-ad-slot="9453633166"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></AdBanner>

        <Stats audioFeatures={galaxy.stats}></Stats>

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

        <AdBanner
          data-ad-slot="7944631444"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></AdBanner>
      </main>
    </div>
  );
};

export default Home;
