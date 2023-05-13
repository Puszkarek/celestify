import { GalaxyBackground } from '@app/interfaces/galaxy';

type BackgroundItems = [GalaxyBackground, ...Array<GalaxyBackground>];

export const BACKGROUNDS: Record<'sad' | 'happy', BackgroundItems> = {
  // Low energy and low valence for a cool, reserved atmosphere
  sad: [
    {
      colors: [
        [0.2, '#1d1630'],
        [0.8, '#331e43'],
      ],
      angle: 100,
    },
    {
      colors: [
        [0, '#21132a'],
        [0.8, '#1e373d'],
      ],
      angle: 260,
    },
    {
      colors: [
        [0, '#24313e'],
        [0.8, '#331e43'],
      ],
      angle: 260,
    },
  ],
  // High energy and valence for a warm, energetic atmosphere
  happy: [
    {
      colors: [
        [0.2, '#2a2955'],
        [0.5, '#211739'],
      ],
      angle: 35,
    },
    {
      colors: [
        [0.15, '#2c6d85'],
        [0.4, '#331e43'],
        [1, '#1d1630'],
      ],
      angle: 135,
    },
    {
      colors: [
        [0, '#2c6d85'],
        [0.5, '#331e43'],
      ],
      angle: 60,
    },
    {
      colors: [
        [0, '#2c6d85'],
        [0.5, '#331e43'],
      ],
      angle: 260,
    },
    {
      colors: [
        [0, '#24313e'],
        [1, '#26255f'],
      ],
      angle: 260,
    },
  ],
};
