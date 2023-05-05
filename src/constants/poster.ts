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
  'gas-giant': 2,
  'oceanic': 2,
  'black-hole': 2,
  'electric': 2,
  'ice': 2,
  'rocky': 2,
  'supernova': 2,
  'vulcanic': 2,
  'wildlife': 2,
};

export const STAR_TYPES_COUNT = {
  common: 8,
  rare: 12,
};
