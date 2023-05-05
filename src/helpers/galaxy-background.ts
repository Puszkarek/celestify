import { AudioFeatures } from '@app/helpers/music';
import { GalaxyBackground, GalaxyStarCount } from '@app/interfaces/galaxy';

// From calmest to most energetic (more energetic = sunrise; more calm = sunset or night)
const BOTTOM_COLORS = [
  '#75c192', // Green
  '#539680', // Green dark
  '#0f676b', // Cyan
  '#16605d', // Cyan dark
  '#1c5a4f', // Cyan darker
  '#0d353e', // Cyan darkest
  '#d97261', // Sunset
  '#103e5a', // Night light
  '#0f3543', // Night
  '#0a2f46', // Night dark
] as const;

// From most happy to most sad (more happy = blue; more sad = purple / dark)
const TOP_COLORS = [
  '#1b3f3f', // Cyan
  '#0a2f46', // Cyan
  '#222434', // Blue
  '#162640', // Blue
  '#452052', // Purple
  '#2e2049', // Purple
  '#2d2352', // Purple
  '#1f1c32', // Black
  '#211f2b', // Black
  '#221d2e', // Black
] as const;

export const generateGalaxyBackground = ({
  valence,
  energy,
}: AudioFeatures): GalaxyBackground => {
  // Top color: Based on energy
  const top_color =
    TOP_COLORS[Math.round(energy * TOP_COLORS.length)] ?? TOP_COLORS[0];
  // Bottom color: Based on energy and valence
  const bottom_color =
    BOTTOM_COLORS[Math.round(valence * BOTTOM_COLORS.length)] ??
    BOTTOM_COLORS[0];

  return {
    top_color: top_color,
    bottom_color: bottom_color,
  };
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
