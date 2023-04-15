import { spotifyTokenDecoder } from '@app/app/decoders/spotify';
import { safeJSONParse } from '@app/app/utils/json';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import { cookies } from 'next/headers';

const Home = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const rawToken = cookieStore.get('token')?.value;
  const tokenE = pipe(
    rawToken,
    O.fromNullable,
    O.chain(safeJSONParse),
    O.filter(spotifyTokenDecoder.is),
  );

  if (O.isNone(tokenE)) {
    // TODO: throw error?
    return <main>Not logged in</main>;
  }

  return <main>This is the timeline</main>;
};

export default Home;
