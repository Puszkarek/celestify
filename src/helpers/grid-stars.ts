/* eslint-disable max-statements */
'use client';

import { GRID_SIZE } from '@app/constants/grid';
import { Galaxy } from '@app/interfaces/galaxy';
import { PosterGridItem, PosterStarItem } from '@app/interfaces/poster';
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

const initStar = (seed: string): PosterGridItem => {
  const starSize = seededRandomGenerator(seed, 4, 9);
  const starVariant = 0;
  const item: PosterStarItem = {
    type: 'star',
    url: `images/stars/0/common/${starVariant}.svg`,
    width: starSize,
    height: starSize,
    x: 0,
    y: 0,
  };

  return item;
};

export const addStars = async (
  seed: string,
  starsParameters: Galaxy['stars'],
  currentGridItems: Array<PosterGridItem>,
): Promise<Array<PosterGridItem>> => {
  const starPositions: Array<PosterGridItem> = [...currentGridItems];

  while (starPositions.length < starsParameters.common) {
    const starSeed = seed + starPositions.length;
    const item = initStar(starSeed);

    let attempts = 0;
    let positionFound = false;

    while (attempts < MAX_LOOP_ATTEMPTS && !positionFound) {
      item.x = seededRandomGenerator(
        `${seed}${attempts}-x`,
        0,
        GRID_SIZE - item.width,
      );
      item.y = seededRandomGenerator(
        `${seed}${attempts}-y`,
        0,
        GRID_SIZE - item.height,
      );

      // TODO: fix it not working, the items are being overlapped
      if (isOverlapping(item, starPositions)) {
        attempts++;
      } else {
        positionFound = true;
      }
    }

    if (!positionFound) {
      // TODO: might be a `Either`
      return starPositions; // If no suitable position is found, exit the function early
    }

    starPositions.push(item);
  }
  // TODO: starPositions.length < starsParameters.rare

  return starPositions;
};
