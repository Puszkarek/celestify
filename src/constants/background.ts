export const BACKGROUNDS = {
  // Low energy and low valence for a cool, reserved atmosphere
  sad: [
    {
      colors: [
        [0, '#1c1b2a'],
        [0.5, '#0d0c1a'],
        [1, '#0b0a16'],
      ],
      angle: 135,
    },
  ],
  // High energy and valence for a warm, energetic atmosphere
  happy: [
    {
      colors: [
        [0, '#2f2b5a'],
        [0.5, '#1d1b3a'],
        [1, '#1b1936'],
      ],
      angle: 135,
    },
  ],
  // High energy for a energetic bright atmosphere
  default: [
    {
      colors: [
        [0, '#2c6d85'],
        [0.2, '#331e43'],
        [1, '#1d1630'],
      ],
      angle: 135,
    },
  ],
} as const;
