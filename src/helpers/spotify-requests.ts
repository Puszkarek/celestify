import { fetchSpotify } from '@app/helpers/spotify-api';
import { TopItemsResponse } from '@app/interfaces/api-endpoints';
import { Exception } from '@app/interfaces/error';
import {
  SpotifyAudioFeaturesResponse,
  SpotifyMostPlayedTracksResponse,
  SpotifyUserData,
} from '@app/interfaces/spotify';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

export const getTopItems = (
  code: string,
  timeRange: 'long_term' | 'medium_term' | 'short_term',
): TE.TaskEither<Exception, TopItemsResponse> => {
  return pipe(
    // * Fetch top tracks
    fetchSpotify<SpotifyMostPlayedTracksResponse>(
      `me/top/tracks?limit=50&time_range=${timeRange}`,
      code,
    ),
    TE.bindTo('tracks'),
    TE.bind('features', ({ tracks }) => {
      const ids = tracks.items.map((track) => track.id);
      return fetchSpotify<SpotifyAudioFeaturesResponse>(
        `audio-features?ids=${ids.join(',')}`,
        code,
      );
    }),
    TE.map(({ tracks, features }) => {
      return {
        tracks: tracks.items,
        features: features.audio_features,
      };
    }),
  );
};

export const getUserData = (
  code: string,
): TE.TaskEither<Exception, SpotifyUserData> => {
  return pipe(
    // * Fetch top tracks
    fetchSpotify<SpotifyUserData>('me', code),
    TE.map(({ display_name }) => {
      return {
        display_name,
      };
    }),
  );
};
