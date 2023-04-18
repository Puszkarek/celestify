import * as t from 'io-ts';

export const spotifyErrorDecoder = t.type({
  error: t.string,
  error_description: t.string,
});

export const spotifyTokenDecoder = t.type({
  access_token: t.string,
  refresh_token: t.string,
  expires_in: t.number,
});

export const spotifyImageDecoder = t.type({
  height: t.number,
  width: t.number,
  url: t.string,
});

export const spotifyArtistDecoder = t.type({
  type: t.literal('artist'),
  id: t.string,
  name: t.string,
  href: t.string,
  uri: t.string,
  external_urls: t.type({
    spotify: t.string,
  }),
});

export const spotifyAlbumDecoder = t.type({
  type: t.literal('album'),
  id: t.string,
  name: t.string,
  album_type: t.union([
    t.literal('ALBUM'),
    t.literal('SINGLE'),
    t.literal('COMPILATION'),
  ]),
  artists: t.array(spotifyArtistDecoder),
  href: t.string,
  images: t.array(spotifyImageDecoder),
  release_date: t.string,
  total_tracks: t.number,
  uri: t.string,
});

export const spotifyTrackDecoder = t.type({
  type: t.literal('track'),
  id: t.string,
  name: t.string,
  artists: t.array(spotifyArtistDecoder),
  album: spotifyAlbumDecoder,
  duration_ms: t.number,
  popularity: t.number, // ? We might be able to do something with this
});

export const spotifyContextDecoder = t.type({
  type: t.literal('artist'),
  external_urls: t.type({
    spotify: t.string,
  }),
  href: t.string,
  uri: t.string,
});

// * Endpoints
export const spotifyMostPlayedTracksDecoder = t.type({
  items: t.array(spotifyTrackDecoder),
  next: t.union([t.string, t.null]),
  limit: t.number,
  href: t.string,
});
