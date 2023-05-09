export const BACKGROUNDS = {
  // Low energy and low valence for a cool, reserved atmosphere
  sad: [
    {
      colors: [
        [0.2, '#1d1630'],
        [0.8, '#331e43'],
      ],
      angle: 100,
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
  ],
  // High energy for a energetic bright atmosphere
  default: [
    {
      colors: [
        [0.15, '#2c6d85'],
        [0.4, '#331e43'],
        [1, '#1d1630'],
      ],
      angle: 135,
    },
  ],
} as const;
