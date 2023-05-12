import { POSTER_DESCRIPTION } from '@app/constants/poster-description';
import { generateCelestialBody } from '@app/helpers/celestial-body';
import { getAverageAudioFeatures } from '@app/helpers/feature-by-artist';
import {
  generateGalaxyBackground,
  generateGalaxyStars,
} from '@app/helpers/galaxy-background';
import { FeaturesByArtist } from '@app/helpers/music';
import { CelestialBody, Galaxy } from '@app/interfaces/galaxy';
import { seededRandomGenerator } from '@app/utils/random';

export const getGalaxyDescription = (
  galaxyID: string,
  celestialBodies: Array<CelestialBody>,
): string => {
  // If there is only one celestial body, return a description for one celestial body
  if (celestialBodies.length === 1) {
    const oneAlternative = POSTER_DESCRIPTION['1'];

    return oneAlternative[
      seededRandomGenerator(
        galaxyID + celestialBodies.length.toString(),
        0,
        oneAlternative.length - 1,
      )
    ] as string;
  }

  // If all `.type` are the same, return that type
  const referenceType = celestialBodies[0]?.type;
  if (
    referenceType &&
    celestialBodies.every(
      (celestialBody) => celestialBody.type === referenceType,
    )
  ) {
    const alternatives =
      POSTER_DESCRIPTION[referenceType as keyof typeof POSTER_DESCRIPTION];

    // Get the description based on the type of all celestial bodies
    return alternatives[
      seededRandomGenerator(
        galaxyID + referenceType,
        0,
        alternatives.length - 1,
      )
    ] as string;
  }

  // All the other cases
  const commonAlternatives =
    POSTER_DESCRIPTION[
      celestialBodies.length.toString() as keyof typeof POSTER_DESCRIPTION
    ];

  // Get the description based on the number of celestial bodies
  return commonAlternatives[
    seededRandomGenerator(
      galaxyID + celestialBodies.length.toString(),
      0,
      commonAlternatives.length - 1,
    )
  ] as string;
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
    background: generateGalaxyBackground(averageAudioFeatures),
    stars: generateGalaxyStars(averageAudioFeatures),
    description: getGalaxyDescription(galaxyID, celestialBodies),
  };
};
