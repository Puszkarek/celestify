import {
  spotifyAudioFeaturesDecoder,
  spotifyTrackDecoder,
} from '@app/decoders/spotify';
import * as t from 'io-ts';
// * Endpoints
export const topItemsResponseDecoder = t.type({
  tracks: t.array(spotifyTrackDecoder),
  features: t.array(spotifyAudioFeaturesDecoder),
});
