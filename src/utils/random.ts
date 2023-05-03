type SeedType = number | string;

const stringToNumberSeed = (seed: string): number => {
  let hash = 0;
  for (let seedIndex = 0; seedIndex < seed.length; seedIndex++) {
    console.count('generating hash');
    /* eslint-disable unicorn/prefer-code-point */
    const charCode = seed.charCodeAt(seedIndex);
    hash = (hash * 31 + charCode) % Math.pow(2, 30);
  }
  return hash;
};

export const randomWithSeed = (seed: SeedType): number => {
  const numericSeed =
    typeof seed === 'string' ? stringToNumberSeed(seed) : seed;
  const sinSeed = Math.sin(numericSeed) * 10_000;
  return sinSeed - Math.floor(sinSeed);
};

export const seededRandomGenerator = (
  seed: SeedType,
  min: number,
  max: number,
): number => {
  return Math.floor(randomWithSeed(seed) * (max - min + 1)) + min;
};
