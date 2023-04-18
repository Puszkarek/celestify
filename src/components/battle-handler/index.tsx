'use client';

import './style.scss';

import { Track } from '@app/components/track';
import { spotifyMostPlayedTracksDecoder } from '@app/decoders/spotify';
import { SpotifyTrack } from '@app/interfaces/spotify';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';

type TracksByArtist = Map<string, Array<SpotifyTrack>>;

const groupTracksByArtist = (tracks: Array<SpotifyTrack>): TracksByArtist => {
  const tracksMap = new Map<string, Array<SpotifyTrack>>();

  const twoMostListenedArtists = tracks.reduce((accumulator, track) => {
    const artistName = track.artists[0]?.name;
    if (artistName) {
      const artistTracksCount = accumulator.get(artistName);
      if (!artistTracksCount) {
        accumulator.set(artistName, 0);
      }

      accumulator.set(artistName, (artistTracksCount ?? 0) + 1);
    }
    return accumulator;
  }, new Map<string, number>());

  console.log('twoMostListenedArtists', twoMostListenedArtists);

  for (const track of tracks) {
    const artistName = track.artists[0]?.name;
    if (artistName) {
      if (!tracksMap.has(artistName)) {
        tracksMap.set(artistName, []);
      }
      tracksMap.get(artistName)?.push(track);
    }
  }

  return tracksMap;
};

export const BattleHandler = ({ data }: { data: unknown }): JSX.Element => {
  console.log(data);
  const tracks = pipe(
    data,
    spotifyMostPlayedTracksDecoder.decode,
    E.map(({ items }) => items),
    E.map(groupTracksByArtist),
    E.getOrElse(() => {
      return new Map<string, Array<SpotifyTrack>>();
    }),
  );

  console.log('TRACKS', tracks);

  return (
    <div className="battle-container">
      Choose fast
      <div className="choice-container">
        <div className="choice-content left-choice">
          <Track track={tracks.get('Jão')[0]!} />
        </div>
        <div className="choice-content right-choice">
          <Track track={tracks.get('Jão')[0]!} />
        </div>
      </div>
    </div>
  );
};
