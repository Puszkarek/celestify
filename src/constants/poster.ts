import { GalaxyStarCount } from '@app/interfaces/galaxy';
import { PosterItemSize } from '@app/interfaces/poster';

export const POSTER_CELESTIAL_BODY_SIZES: [
  PosterItemSize,
  ...Array<PosterItemSize>,
] = [
  { width: 5, height: 6 },
  { width: 6, height: 7 },
  { width: 7, height: 8 },
];

export const CELESTIAL_BODY_TYPES_COUNT = {
  'gas-giant': [0, 1],
  'oceanic': [0, 1],
  'black-hole': [0, 1],
  'electric': [0, 1],
  'ice': [0, 1],
  'rocky': [0, 1],
  'supernova': [0, 1],
  'vulcanic': [0, 1],
  'wildlife': [0, 1],
};

export const STAR_TYPES_COUNT: [GalaxyStarCount, ...Array<GalaxyStarCount>] = [
  {
    common: 3,
    rare: 3,
  },
  {
    common: 1,
    rare: 3,
  },
];
