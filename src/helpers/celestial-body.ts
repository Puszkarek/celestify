/* eslint-disable complexity */
/* eslint-disable max-statements */
import { CelestialBody } from '@app/interfaces/galaxy';
import { AudioFeatures, FeaturesByArtist } from '@app/interfaces/music';

/**
 * Determines the type of celestial body based on the audio features
 *
 *
 * @param audioFeatures - All parameters are between 0 and 1
 * @returns The type of celestial body
 */
export const getCelestialBodyType = ({
  energy,
  valence,
  danceability,
  acousticness,
}: AudioFeatures): CelestialBody['type'] => {
  /**
   * Black Hole: Low valence for a dark, mysterious atmosphere
   */
  if (energy > 0.8 && valence <= 0.39) {
    return 'black-hole';
  }
  /**
   * Star: High energy and high valence for a bright, happy atmosphere
   */
  if (energy > 0.8 && valence >= 0.8) {
    return 'star';
  }

  if (energy <= 0.49) {
    if (valence >= 0.5 && danceability <= 0.5) {
      /** Oceanic Planet: Low energy and high valence for a calm, soothing atmosphere,
     With low danceability representing the stillness and serenity of water */
      return 'oceanic';
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

  if (energy >= 0.65 && valence <= 0.4 && danceability >= 0.5) {
    /** Volcanic Planet: High energy and low valence for an intense, dramatic atmosphere,
     * With medium to high danceability representing the dynamic nature of volcanoes and eruptions */
    return 'vulcanic';
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

export const generateCelestialBody = ({
  artist,
  feature,
}: FeaturesByArtist): CelestialBody => {
  return {
    name: artist.name,
    size: feature.popularity,
    type: getCelestialBodyType(feature),
  };
};
