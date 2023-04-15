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
  album_group: t.literal('album'),
  album_type: t.literal('album'),
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
export const spotifyRecentlyPlayedDecoder = t.type({
  items: t.array(
    t.type({
      track: spotifyTrackDecoder,
      played_at: t.string,
      context: t.union([spotifyContextDecoder, t.null]),
    }),
  ),
  next: t.string,
  cursors: t.type({
    after: t.string,
    before: t.string,
  }),
  limit: t.number,
  href: t.string,
});
