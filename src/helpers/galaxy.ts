import { generateGalaxyBackground } from '@app/helpers/color';
import { getAverageAudioFeatures } from '@app/helpers/feature-by-artist';
import { AudioFeatures, FeaturesByArtist } from '@app/helpers/music';
import { CelestialBody, Galaxy } from '@app/interfaces/galaxy';

/**
 * Determines the type of planet based on the audio features
 *
 * @param audioFeatures - All parameters are between 0 and 1
 * @returns The type of planet
 */
// eslint-disable-next-line complexity
const getPlanetType = ({
  energy,
  acousticness,
  danceability,
  valence,
}: AudioFeatures): string => {
  // * Importance order: energy, valence, danceability, acousticness

  if (energy <= 0.49) {
    // TODO: apocalypse planet?
    // TODO: might be something inspired by broke planet, depends on midjourney
    if (valence <= 0.5 && danceability <= 0.5) {
      /** Ice Planet: Low energy and low valence for a cool, reserved atmosphere,
       * With low to medium danceability representing the stillness and rigidity of ice */
      return 'ice';
    }

    if (valence >= 0.5 && danceability <= 0.5) {
      /** Ocean Planet: Low energy and high valence for a calm, soothing atmosphere,
     With low danceability representing the stillness and serenity of water */
      return 'ocean';
    }

    if (acousticness >= 0.55 && danceability <= 0.5) {
      /** Gas Giant: Low to medium energy and high acousticness for an ambient, ethereal feeling,
       * With low to medium danceability representing the fluidity of gas and slower movement */
      return 'gas-giant';
    }
    if (acousticness >= 0.5 && danceability >= 0.5) {
      /** Rocky Planet: Lower energy and higher acousticness for a "grounded" and "natural" feeling,
       * With medium to high danceability representing the solid surface and movement */
      return 'rocky';
    }
  }

  // * Energy >= 0.5
  // TODO: Party planet?
  // TODO: might something inspired by Alice in Wonderland, depends on midjourney

  if (energy >= 0.65 && valence <= 0.4 && danceability >= 0.5) {
    /** Volcanic Planet: High energy and low valence for an intense, dramatic atmosphere,
     * With medium to high danceability representing the dynamic nature of volcanoes and eruptions */
    return 'volcanic';
  }

  if (danceability >= 0.55 && valence >= 0.55 && acousticness <= 0.3) {
    /** Electric Planet: High energy and high valence for an exciting, energetic atmosphere,
     * With low to medium acousticness representing the "electric" feeling of the planet */
    return 'electric';
  }

  /** Wildlife Planet: High energy and high valence for a lively, vibrant atmosphere,
   * With medium to high danceability representing the active life and movement */
  return 'wildlife';
};

/**
 * Determines the type of celestial body based on the audio features
 *
 *
 * @param audioFeatures - All parameters are between 0 and 1
 * @returns The type of celestial body
 */
export const getCelestialBodyType = (audioFeatures: AudioFeatures): string => {
  /**
   * Black Hole: High energy and low valence for a dark, mysterious feeling,
   * With low to medium danceability representing the stillness and rigidity of a black hole
   */
  if (audioFeatures.energy >= 0.9 && audioFeatures.valence <= 0.39) {
    return 'black-hole';
  }
  /**
   * Supernova: High energy and low acousticness for a powerful, explosive feeling,
   * With low to medium danceability representing the sudden, explosive nature of a supernova
   */
  if (audioFeatures.energy > 0.8 && audioFeatures.acousticness < 0.15) {
    return 'supernova';
  }

  return getPlanetType(audioFeatures);
};

export const generateCelestialBody = ({
  artist,
  feature,
}: FeaturesByArtist): CelestialBody => {
  const min_popularity = 0;
  const max_popularity = 1;

  const min_size = 0.3;
  const max_size = 1.8;

  // Linear interpolation formula: y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
  const size =
    min_size +
    ((feature.popularity - min_popularity) * (max_size - min_size)) /
      (max_popularity - min_popularity);

  return {
    name: artist.name,
    size,
    type: getCelestialBodyType(feature),
  };
};

export const generateGalaxy = (
  artistTracks: Map<string, FeaturesByArtist>,
): Galaxy => {
  const celestialBodies: Array<CelestialBody> = [];
  const total_features: Array<FeaturesByArtist['feature']> = [];

  artistTracks.forEach((value) => {
    // * Create the celestial body
    celestialBodies.push(generateCelestialBody(value));
    // * Add the features to the total features array
    total_features.push(value.feature);
  });

  return {
    celestialBodies: celestialBodies,
    background: generateGalaxyBackground(
      getAverageAudioFeatures(total_features),
    ),
  };
};
