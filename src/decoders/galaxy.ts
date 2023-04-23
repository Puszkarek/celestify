import * as t from 'io-ts';

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
  type: t.string,
});

export const galaxyDecoder = t.type({
  celestialBodies: t.array(celestialBodyDecoder),
  // Stars: Array<Star>; // Might based on genres
  background: galaxyBackgroundDecoder,
});
