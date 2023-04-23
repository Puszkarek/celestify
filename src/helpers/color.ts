import { AudioFeatures } from '@app/helpers/music';
import { GalaxyBackground } from '@app/interfaces/galaxy';

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

export const generateGalaxyBackground = (
  features: AudioFeatures,
): GalaxyBackground => {
  // Top color: Based on energy
  const top_color =
    TOP_COLORS[Math.round(features.energy * TOP_COLORS.length)] ??
    TOP_COLORS[0];
  // Bottom color: Based on energy and valence
  const bottom_color =
    BOTTOM_COLORS[Math.round(Math.random() * BOTTOM_COLORS.length)] ??
    BOTTOM_COLORS[0];

  console.log(bottom_color);
  return {
    top_color: top_color,
    bottom_color: bottom_color,
  };
};
