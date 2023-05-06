'use client';

/* eslint-disable id-length */
import './style.scss';

import { PosterStars } from '@app/components/poster-stars';
import {
  CELESTIAL_BODY_TYPES_COUNT,
  POSTER_CELESTIAL_BODY_SIZES,
} from '@app/constants/poster';
import { generateGridItems } from '@app/helpers/grid';
import { CelestialBody, Galaxy } from '@app/interfaces/galaxy';
import { PosterItem } from '@app/interfaces/poster';
import { clone } from '@app/utils/object';
import { seededRandomGenerator } from '@app/utils/random';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const PosterHandlerComponent = ({
  galaxy,
}: {
  galaxy: Galaxy;
}): JSX.Element => {
  const contentStyles: React.CSSProperties = {
    background: galaxy.background,
  };

  const topItems = galaxy.celestialBodies.slice(0, 5) as [
    CelestialBody,
    ...Array<CelestialBody>,
  ];

  if (topItems.length === 0) {
    throw new Error('No celestial bodies found');
  }

  const gridItems = generateGridItems(
    topItems,
    POSTER_CELESTIAL_BODY_SIZES,
    galaxy.id,
  );

  const availableBodyTypes = clone(CELESTIAL_BODY_TYPES_COUNT);

  return (
    <div className="poster-container shadow" style={contentStyles}>
      <PosterStars stars={galaxy.stars} galaxyID={galaxy.id}></PosterStars>
      {topItems.map((celestialBody, index) => {
        const gridItem = gridItems[index] as PosterItem;

        const positionStyles: React.CSSProperties = {
          gridColumnStart: gridItem.x + 1,
          gridColumnEnd: gridItem.x + gridItem.width + 1,
          gridRowStart: gridItem.y + 1,
          gridRowEnd: gridItem.y + gridItem.height + 1,
        };

        // TODO: should not repeat the same image
        const imageIDList = availableBodyTypes[celestialBody.type];

        const imageIndex = seededRandomGenerator(
          `${galaxy.id}-${index}`,
          0,
          imageIDList.length - 1,
        );

        const imageID = imageIDList[imageIndex];
        // DELETE
        availableBodyTypes[celestialBody.type] = imageIDList.filter(
          (id) => id !== imageID,
        );

        return (
          <div
            key={index}
            className={`poster-item item`}
            style={positionStyles}
          >
            <Image
              src={`/images/celestial-bodies/${celestialBody.type}/${imageID}.svg`}
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
