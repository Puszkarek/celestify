import './style.scss';

import { createException } from '@app/app/utils/error';
import { safeJSONParse } from '@app/app/utils/json';
import { BattleHandler } from '@app/components/battle-handler';
import { spotifyTokenDecoder } from '@app/decoders/spotify';
import { fetchSpotify } from '@app/helpers/spotify-api';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import { cookies } from 'next/headers';

const Home = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const rawToken = cookieStore.get('token')?.value;
  const requestTask = pipe(
    rawToken,
    O.fromNullable,
    O.chain(safeJSONParse),
    O.filter(spotifyTokenDecoder.is),
    O.map(({ access_token }) => access_token),
    TE.fromOption(() => createException('Invalid token')),
    TE.chain((code) => fetchSpotify('me/top/tracks?limit=50', code)),
  );

  const response = await requestTask();

  if (E.isLeft(response)) {
    return <main>Not logged in</main>;
  }

  return (
    <>
      <main className="home-container">
        <BattleHandler data={response.right} />
      </main>
    </>
  );
};

export default Home;
