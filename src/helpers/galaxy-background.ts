import { BACKGROUNDS } from '@app/constants/background';
import { GalaxyBackground, GalaxyStarCount } from '@app/interfaces/galaxy';
import { AudioFeatures } from '@app/interfaces/music';
import { seededRandomGenerator } from '@app/utils/random';

export const generateGalaxyBackground = (
  seed: string,
  { valence }: AudioFeatures,
): GalaxyBackground => {
  if (valence <= 0.5) {
    return BACKGROUNDS.sad[
      seededRandomGenerator(seed, 0, BACKGROUNDS.sad.length - 1)
    ] as GalaxyBackground;
  }

  return BACKGROUNDS.happy[
    seededRandomGenerator(seed, 0, BACKGROUNDS.happy.length - 1)
  ] as GalaxyBackground;
};
export const generateGalaxyStars = ({
  energy,
  valence,
}: AudioFeatures): GalaxyStarCount => {
  const energyBasedStars = Math.max(
    70,
    Math.min(180, Math.round(energy * 180)),
  );
  const totalStars = energyBasedStars;

  const commonPercentage = 0.9; // Need at least 90% of total stars
  const rarePercentage = 0.1; // At max 10% of total stars

  const commonCount = Math.round(totalStars * commonPercentage);
  const rareCount = Math.min(
    Math.round(totalStars * rarePercentage),
    valence < 0.2 ? 0 : Math.round(valence * totalStars * rarePercentage),
  );

  return {
    common: commonCount,
    rare: rareCount,
  };
};
