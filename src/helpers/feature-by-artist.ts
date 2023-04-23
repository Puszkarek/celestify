import { AudioFeatures, FeaturesByArtist } from '@app/helpers/music';
import {
  SpotifyArtist,
  SpotifyAudioFeatures,
  SpotifyTrack,
} from '@app/interfaces/spotify';
import { mapRecord } from '@app/utils/list';

export const getAverageAudioFeatures = (
  audioFeatures: Array<AudioFeatures>,
): AudioFeatures => {
  const total_features: AudioFeatures = {
    danceability: 0,
    energy: 0,
    acousticness: 0,
    valence: 0,
  };

  audioFeatures.forEach((features) => {
    total_features.danceability += features.danceability;
    total_features.energy += features.energy;
    total_features.acousticness += features.acousticness;
    total_features.valence += features.valence;
  });

  return {
    danceability: total_features.danceability / audioFeatures.length,
    energy: total_features.energy / audioFeatures.length,
    acousticness: total_features.acousticness / audioFeatures.length,
    valence: total_features.valence / audioFeatures.length,
  };
};

export const groupFeatureByArtist = (
  data: Array<{
    metadata: SpotifyTrack;
    features: SpotifyAudioFeatures;
  }>,
): Map<string, FeaturesByArtist> => {
  const featuresByArtistMap = new Map<
    string,
    {
      artist: SpotifyArtist;
      features: Array<SpotifyAudioFeatures>;
    }
  >();

  for (const track of data) {
    const artist = track.metadata.artists[0];
    if (artist) {
      const artistName = artist.name;
      if (!featuresByArtistMap.has(artistName)) {
        featuresByArtistMap.set(artistName, {
          artist,
          features: [],
        });
      }
      featuresByArtistMap.get(artistName)?.features.push(track.features);
    }
  }

  return mapRecord(featuresByArtistMap, (value) => {
    return {
      artist: value.artist,
      feature: getAverageAudioFeatures(value.features),
    };
  });
};
