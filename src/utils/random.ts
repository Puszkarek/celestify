export const randomWithSeed = (seed: number): number => {
  const sinSeed = Math.sin(seed) * 10_000;
  return sinSeed - Math.floor(sinSeed);
};

export const seededRandomGenerator = (
  seed: number,
  min: number,
  max: number,
): number => {
  return Math.floor(randomWithSeed(seed) * (max - min + 1)) + min;
};
