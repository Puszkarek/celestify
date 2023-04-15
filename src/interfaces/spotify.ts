import {
  spotifyAlbumDecoder,
  spotifyArtistDecoder,
  spotifyContextDecoder,
  spotifyErrorDecoder,
  spotifyRecentlyPlayedDecoder,
  spotifyTokenDecoder,
  spotifyTrackDecoder,
} from '@app/app/decoders/spotify';
import * as t from 'io-ts';

export type SpotifyError = t.TypeOf<typeof spotifyErrorDecoder>;

export type SpotifyToken = t.TypeOf<typeof spotifyTokenDecoder>;

export type SpotifyAlbum = t.TypeOf<typeof spotifyAlbumDecoder>;

export type SpotifyArtist = t.TypeOf<typeof spotifyArtistDecoder>;

export type SpotifyTrack = t.TypeOf<typeof spotifyTrackDecoder>;

export type SpotifyContext = t.TypeOf<typeof spotifyContextDecoder>;

// * Endpoints
export type RecentlyPlayed = t.TypeOf<typeof spotifyRecentlyPlayedDecoder>;
