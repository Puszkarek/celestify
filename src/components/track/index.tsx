import './style.scss';

import { SpotifyTrack } from '@app/interfaces/spotify';
import Image from 'next/image';

export const Track = ({ track }: { track: SpotifyTrack }): JSX.Element => {
  const albumCover = track.album.images[0];

  return (
    <div className="track-container shadow">
      {albumCover && (
        <Image
          className="track-cover"
          src={albumCover.url}
          height={albumCover.height}
          width={albumCover.width}
          priority={true}
          alt="Album cover"
        />
      )}

      <div className="track-info">
        <div className="track-name">{track.name}</div>
      </div>
    </div>
  );
};
