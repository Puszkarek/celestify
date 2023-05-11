/* eslint-disable max-statements */
'use client';

import { GRID_SIZE } from '@app/constants/grid';
import { STAR_TYPES_COUNT } from '@app/constants/poster';
import { Galaxy } from '@app/interfaces/galaxy';
import {
  GridItemPosition,
  GridItemSize,
  PosterGridItem,
  PosterStarItem,
} from '@app/interfaces/poster';
import { seededRandomGenerator } from '@app/utils/random';

const MAX_LOOP_ATTEMPTS = 500;

export const isOverlapping = (
  newItem: PosterGridItem,
  reacts: Array<PosterGridItem>,
): boolean => {
  // TODO: different check for text
  return reacts.some((rect) => {
    return (
      newItem.x < rect.x + rect.width &&
      newItem.x + newItem.width > rect.x &&
      newItem.y < rect.y + rect.height &&
      newItem.y + newItem.height > rect.y
    );
  });
};

const initStar = (
  seed: string,
  collectionID: number,
  variantCount: number,
  type: 'common' | 'rare',
  [min, max]: [number, number],
): PosterGridItem => {
  const starSize = seededRandomGenerator(seed + type, min, max);

  const starVariant = seededRandomGenerator(
    `${seed}-${type}-variant`,
    0,
    variantCount - 1,
  );

  const item: PosterStarItem = {
    type: 'star',
    url: `images/stars/${collectionID}/${type}/${starVariant}.svg`,
    width: starSize,
    height: starSize,
    x: 0,
    y: 0,
  };

  return item;
};

// eslint-disable-next-line max-lines-per-function
export const addStars = async (
  seed: string,
  starsParameters: Galaxy['stars'],
  currentGridItems: Array<PosterGridItem>,
): Promise<Array<PosterGridItem>> => {
  const starPositions: Array<PosterGridItem> = [...currentGridItems];

  const collectionID = seededRandomGenerator(
    `${seed}collection`,
    0,
    STAR_TYPES_COUNT.length - 1,
  );
  const starsCollection = STAR_TYPES_COUNT[collectionID] ?? STAR_TYPES_COUNT[0];

  while (starPositions.length < starsParameters.common) {
    const starSeed = `${seed + starPositions.length}common`;
    const item = initStar(
      starSeed,
      collectionID,
      starsCollection.common,
      'common',
      [4, 9],
    );

    let attempts = 0;
    let positionFound: GridItemPosition | null = null;

    while (attempts < MAX_LOOP_ATTEMPTS) {
      const newPosition = {
        x: seededRandomGenerator(
          `${seed}${attempts}-x`,
          0,
          GRID_SIZE - item.width,
        ),
        y: seededRandomGenerator(
          `${seed}${attempts}-y`,
          0,
          GRID_SIZE - item.height,
        ),
      };

      if (isOverlapping({ ...item, ...newPosition }, starPositions)) {
        attempts++;
      } else {
        positionFound = newPosition;
        break;
      }
    }

    if (positionFound === null) {
      break;
    }

    starPositions.push({ ...item, ...positionFound });
  }

  const rareStarsCount = starPositions.length + starsParameters.rare;
  while (starPositions.length < rareStarsCount) {
    const starSeed = `${seed + starPositions.length}rare`;
    const item = initStar(
      starSeed,
      collectionID,
      starsCollection.rare,
      'rare',
      [20, 25],
    );

    let attempts = 0;
    let positionFound: GridItemPosition | null = null;

    while (attempts < MAX_LOOP_ATTEMPTS) {
      const xOffset = 25;
      const yOffset = 15;
      const newPosition = {
        x: seededRandomGenerator(
          `${seed}${attempts}-x`,
          xOffset,
          GRID_SIZE - item.width - xOffset,
        ),
        y: seededRandomGenerator(
          `${seed}${attempts}-y`,
          yOffset,
          GRID_SIZE - item.height - yOffset,
        ),
      };

      if (isOverlapping({ ...item, ...newPosition }, starPositions)) {
        attempts++;
      } else {
        positionFound = newPosition;
        break;
      }
    }

    if (positionFound === null) {
      break;
    }

    starPositions.push({ ...item, ...positionFound });
  }

  return starPositions;
};
