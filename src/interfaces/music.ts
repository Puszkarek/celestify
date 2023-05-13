import { audioFeaturesDecoder } from '@app/decoders/music';
import { featuresByArtistDecoder } from '@app/decoders/spotify';
import * as t from 'io-ts';

export type AudioFeatures = t.TypeOf<typeof audioFeaturesDecoder>;

export type FeaturesByArtist = t.TypeOf<typeof featuresByArtistDecoder>;
