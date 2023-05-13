import { CelestialBody, GalaxyStarCount } from '@app/interfaces/galaxy';
import { GridItemSize } from '@app/interfaces/poster';

export const POSTER_CELESTIAL_BODY_SIZES: [
  GridItemSize,
  ...Array<GridItemSize>,
] = [
  { width: 5, height: 6 },
  { width: 6, height: 7 },
  { width: 7, height: 8 },
];

export const CELESTIAL_BODY_TYPES_COUNT: Record<
  CelestialBody['type'],
  Array<number>
> = {
  'black-hole': [0, 1, 2, 3, 4, 5],
  'electric': [0, 1, 2, 3, 4],
  'gas-giant': [0, 1, 2, 3, 4, 5, 6],
  'oceanic': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  'rocky': [0, 1, 2, 3, 4, 5, 6, 7],
  'star': [0, 1, 2, 3, 4, 5, 6],
  'vulcanic': [0, 1, 2, 3, 4, 5, 6, 7],
  'wildlife': [0, 1, 2, 3, 4, 5, 6],
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
