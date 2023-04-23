import { fetchSpotify } from '@app/helpers/spotify-api';
import { TopItemsResponse } from '@app/interfaces/api-endpoints';
import { Exception } from '@app/interfaces/error';
import {
  SpotifyAudioFeaturesResponse,
  SpotifyMostPlayedTracksResponse,
} from '@app/interfaces/spotify';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

export const getTopItems = (
  code: string,
): TE.TaskEither<Exception, TopItemsResponse> => {
  return pipe(
    // * Fetch top tracks
    fetchSpotify<SpotifyMostPlayedTracksResponse>(
      // TODO: supports medium_term, short_term, long_term
      'me/top/tracks?limit=50&time_range=long_term',
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
