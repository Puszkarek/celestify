import {
  spotifyAlbumDecoder,
  spotifyArtistDecoder,
  spotifyAudioFeaturesDecoder,
  spotifyAudioFeaturesResponseDecoder,
  spotifyContextDecoder,
  spotifyErrorDecoder,
  spotifyTokenDecoder,
  spotifyTopTracksResponseDecoder,
  spotifyTrackDecoder,
  spotifyUserDataDecoder,
} from '@app/decoders/spotify';
import * as t from 'io-ts';

export type SpotifyError = t.TypeOf<typeof spotifyErrorDecoder>;

export type SpotifyToken = t.TypeOf<typeof spotifyTokenDecoder>;

export type SpotifyAlbum = t.TypeOf<typeof spotifyAlbumDecoder>;

export type SpotifyArtist = t.TypeOf<typeof spotifyArtistDecoder>;

export type SpotifyTrack = t.TypeOf<typeof spotifyTrackDecoder>;

export type SpotifyAudioFeatures = t.TypeOf<typeof spotifyAudioFeaturesDecoder>;

export type SpotifyContext = t.TypeOf<typeof spotifyContextDecoder>;

export type SpotifyUserData = t.TypeOf<typeof spotifyUserDataDecoder>;

// * Endpoints
export type SpotifyMostPlayedTracksResponse = t.TypeOf<
  typeof spotifyTopTracksResponseDecoder
>;

export type SpotifyAudioFeaturesResponse = t.TypeOf<
  typeof spotifyAudioFeaturesResponseDecoder
>;
