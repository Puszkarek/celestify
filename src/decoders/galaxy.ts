import * as t from 'io-ts';

export const galaxyStarCount = t.type({
  common: t.number,
  rare: t.number,
});

const colorStopDecoder = t.tuple([t.number, t.string]);

export const galaxyBackgroundDecoder = t.type({
  colors: t.array(colorStopDecoder),
  angle: t.number,
});

export const celestialBodyDecoder = t.type({
  /** Artist name */
  name: t.string,
  /** Based on popularity */
  size: t.number,
  /** Based on sadness, happiness, etc */
  type: t.union([
    t.literal('black-hole'),
    t.literal('star'),
    t.literal('wildlife'),
    t.literal('vulcanic'),
    t.literal('electric'),
    t.literal('oceanic'),
    t.literal('rocky'),
    t.literal('gas-giant'),
  ]),
});

export const galaxyDecoder = t.type({
  id: t.string,
  celestialBodies: t.array(celestialBodyDecoder),
  background: galaxyBackgroundDecoder,
  stars: galaxyStarCount,
  description: t.string,
});
