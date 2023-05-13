import { generateCelestialBody } from '@app/helpers/celestial-body';
import { getAverageAudioFeatures } from '@app/helpers/feature-by-artist';
import {
  generateGalaxyBackground,
  generateGalaxyStars,
} from '@app/helpers/galaxy-background';
import { CelestialBody, Galaxy } from '@app/interfaces/galaxy';
import { FeaturesByArtist } from '@app/interfaces/music';

export const getGalaxyDescription = (
  _galaxyID: string,
  _celestialBodies: Array<CelestialBody>,
): string => {
  return "Sorry, It's not ready yet";
};

export const generateGalaxy = (
  artistTracks: Map<string, FeaturesByArtist>,
): Galaxy => {
  const celestialBodies: Array<CelestialBody> = [];
  const total_features: Array<FeaturesByArtist['feature']> = [];

  // Initialize counter
  let counter = 0;
  // Iterate over the Map
  for (const [__, value] of artistTracks.entries()) {
    if (counter >= 5) {
      // If the counter is 5 or more, stop the loop
      break;
    }

    // Create the celestial body
    celestialBodies.push(generateCelestialBody(value));
    // Add the features to the total features array
    total_features.push(value.feature);
    // Increment counter
    counter += 1;
  }

  const averageAudioFeatures = getAverageAudioFeatures(total_features);

  const galaxyID = celestialBodies.reduce(
    (accumulator, item) => accumulator + item.name,
    '',
  );

  return {
    id: galaxyID,
    celestialBodies: celestialBodies,
    background: generateGalaxyBackground(galaxyID, averageAudioFeatures),
    stars: generateGalaxyStars(averageAudioFeatures),
    description: getGalaxyDescription(galaxyID, celestialBodies),
  };
};
