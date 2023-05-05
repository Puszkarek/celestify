import * as t from 'io-ts';

export const galaxyStarCount = t.type({
  common: t.number,
  rare: t.number,
});

export const galaxyBackgroundDecoder = t.type({
  top_color: t.string,
  bottom_color: t.string,
});

export const celestialBodyDecoder = t.type({
  /** Artist name */
  name: t.string,
  /** Based on popularity */
  size: t.number,
  /** Based on sadness, happiness, etc */
  type: t.union([
    t.literal('black-hole'),
    t.literal('supernova'),
    t.literal('wildlife'),
    t.literal('vulcanic'),
    t.literal('electric'),
    t.literal('ice'),
    t.literal('oceanic'),
    t.literal('rocky'),
    t.literal('gas-giant'),
  ]),
});

export const galaxyDecoder = t.type({
  celestialBodies: t.array(celestialBodyDecoder),
  background: galaxyBackgroundDecoder,
  stars: galaxyStarCount,
});
