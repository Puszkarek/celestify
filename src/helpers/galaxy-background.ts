import { BACKGROUNDS } from '@app/constants/background';
import { GalaxyBackground, GalaxyStarCount } from '@app/interfaces/galaxy';
import { AudioFeatures } from '@app/interfaces/music';

export const generateGalaxyBackground = ({
  valence,
  energy,
}: AudioFeatures): GalaxyBackground => {
  return BACKGROUNDS.happy[2];
  // Low energy and low valence for a cool, reserved atmosphere
  if (valence <= 0.5 && energy <= 0.5) {
    return BACKGROUNDS.sad[0];
  }

  // High energy and valence for a warm, energetic atmosphere
  if (valence >= 0.5 && energy >= 0.5) {
    return BACKGROUNDS.happy[0];
  }

  return BACKGROUNDS.default[0];
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
