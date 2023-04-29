'use client';

/* eslint-disable id-length */
import './style.scss';

import { Galaxy } from '@app/interfaces/galaxy';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const PosterHandlerComponent = ({
  galaxy,
}: {
  galaxy: Galaxy;
}): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const contentStyles = {
    '--orbit-top-color': galaxy.background.top_color,
    '--orbit-bottom-color': galaxy.background.bottom_color,
  } as React.CSSProperties;

  const topFive = galaxy.celestialBodies.slice(0, 5);
  return (
    <div className="poster-container shadow">
      <div className="poster-wrap" style={contentStyles}>
        {topFive.reverse().map((celestialBody, index) => {
          return (
            <div key={index} className="poster-item">
              <Image
                src="/images/illustrations/black-hole.png"
                alt="Celestial body representation"
                height={1024}
                width={1024}
                className="poster-item-image"
              ></Image>
              <div className="poster-item-name">{celestialBody.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const PosterHandler = dynamic(
  () => Promise.resolve(PosterHandlerComponent),
  {
    ssr: false,
  },
);
