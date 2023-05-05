import {
  celestialBodyDecoder,
  galaxyBackgroundDecoder,
  galaxyDecoder,
} from '@app/decoders/galaxy';
import * as t from 'io-ts';

import { galaxyStarCount } from '../decoders/galaxy';

export type GalaxyStarCount = t.TypeOf<typeof galaxyStarCount>;

export type GalaxyBackground = t.TypeOf<typeof galaxyBackgroundDecoder>;

export type CelestialBody = t.TypeOf<typeof celestialBodyDecoder>;

export type Galaxy = t.TypeOf<typeof galaxyDecoder>;
