'use client';

/* eslint-disable id-length */
import './style.scss';

import { generateGridItems, GridItem } from '@app/helpers/grid';
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

  const topItems = galaxy.celestialBodies.slice(0, 5);

  const gridItems = generateGridItems(topItems.length, [
    { width: 5, height: 7 },
    { width: 6, height: 8 },
    { width: 7, height: 9 },
  ]);

  return (
    <div className="poster-container shadow" style={contentStyles}>
      {topItems.map((celestialBody, index) => {
        const gridItem = gridItems[index] as GridItem;

        const positionStyles: React.CSSProperties = {
          gridColumnStart: gridItem.x + 1,
          gridColumnEnd: gridItem.x + gridItem.width + 1,
          gridRowStart: gridItem.y + 1,
          gridRowEnd: gridItem.y + gridItem.height + 1,
        };

        return (
          <div
            key={index}
            className={`poster-item item`}
            style={positionStyles}
          >
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
  );
};

export const PosterHandler = dynamic(
  () => Promise.resolve(PosterHandlerComponent),
  {
    ssr: false,
  },
);
