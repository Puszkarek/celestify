'use client';

/* eslint-disable id-length */
import './style.scss';

import { PosterStars } from '@app/components/poster-stars';
import { CELESTIAL_BODY_TYPES_COUNT } from '@app/constants/galaxy';
import { generateGridItems, GridItem } from '@app/helpers/grid';
import { Galaxy } from '@app/interfaces/galaxy';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const PosterHandlerComponent = ({
  galaxy,
}: {
  galaxy: Galaxy;
}): JSX.Element => {
  console.log('poster-handler');
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const contentStyles = {
    '--orbit-top-color': galaxy.background.top_color,
    '--orbit-bottom-color': galaxy.background.bottom_color,
  } as React.CSSProperties;

  const topItems = galaxy.celestialBodies.slice(0, 5);

  if (topItems.length === 0) {
    throw new Error('No celestial bodies found');
  }

  const gridItems = generateGridItems(
    topItems,
    [
      { width: 5, height: 6 },
      { width: 6, height: 7 },
      { width: 7, height: 8 },
    ],
    topItems.reduce((accumulator, item) => accumulator + item.name, ''),
  );

  return (
    <div className="poster-container shadow" style={contentStyles}>
      <PosterStars stars={galaxy.stars}></PosterStars>
      {topItems.map((celestialBody, index) => {
        const gridItem = gridItems[index] as GridItem;

        const positionStyles: React.CSSProperties = {
          gridColumnStart: gridItem.x + 1,
          gridColumnEnd: gridItem.x + gridItem.width + 1,
          gridRowStart: gridItem.y + 1,
          gridRowEnd: gridItem.y + gridItem.height + 1,
        };

        const image = Math.floor(
          Math.random() *
            CELESTIAL_BODY_TYPES_COUNT[
              celestialBody.type as keyof typeof CELESTIAL_BODY_TYPES_COUNT
            ],
        );
        return (
          <div
            key={index}
            className={`poster-item item`}
            style={positionStyles}
          >
            <Image
              src={`/images/celestial-bodies/${celestialBody.type}/${image}.svg`}
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
