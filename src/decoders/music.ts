import { spotifyArtistDecoder } from '@app/decoders/spotify';
import * as t from 'io-ts';

// * Custom
export const audioFeaturesDecoder = t.type({
  energy: t.number,
  danceability: t.number,
  acousticness: t.number,
  valence: t.number,
});
