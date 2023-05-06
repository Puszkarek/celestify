/* eslint-disable max-statements */
import { CelestialBody } from '@app/interfaces/galaxy';
import {
  PosterItem,
  PosterItemPossibleSizes,
  PosterItemSize,
} from '@app/interfaces/poster';
import { seededRandomGenerator } from '@app/utils/random';

export const sizeToGridSize = (
  size: number,
  sizeOptions: [PosterItemSize, ...Array<PosterItemSize>],
): {
  width: number;
  height: number;
} => {
  const centerItemSizeIndex = Math.floor(size * (sizeOptions.length - 1));
  const centerItemDimensions =
    sizeOptions[centerItemSizeIndex] ?? sizeOptions[0];

  return centerItemDimensions;
};

export const generateRandomItem = (
  celestialBody: CelestialBody,
  sizeOptions: PosterItemPossibleSizes,
  seed: string,
): PosterItem => {
  const { width, height } = sizeToGridSize(celestialBody.size, sizeOptions);
  return {
    x: seededRandomGenerator(`${seed}-y`, 0, 21 - width),
    y: seededRandomGenerator(`${seed}-x`, 0, 21 - height),
    width,
    height,
  };
};

export const isOverlap = (item1: PosterItem, item2: PosterItem): boolean => {
  return (
    item1.x < item2.x + item2.width &&
    item1.x + item1.width > item2.x &&
    item1.y < item2.y + item2.height &&
    item1.y + item1.height > item2.y
  );
};

const isItemAligned = (item_1: PosterItem, item_2: PosterItem): boolean => {
  return item_1.x === item_2.x || item_1.y === item_2.y;
};

export const generateGridItems = (
  items: [CelestialBody, ...Array<CelestialBody>],
  sizeOptions: PosterItemPossibleSizes,
  seed: string,
): Array<PosterItem> => {
  const gridItems: Array<PosterItem> = [];

  // * Start from center
  gridItems.push({
    ...sizeToGridSize(items[0].size, sizeOptions),
    x: seededRandomGenerator(`${seed}-y`, 7, 8),
    y: seededRandomGenerator(`${seed}-x`, 7, 8),
  });

  let count = 0;
  while (gridItems.length < items.length) {
    count += 0.123;

    if (count >= 100) {
      console.log('RESET');
      count = 0;
      // Reset the gridItems and start over if it takes too long to generate
      gridItems.slice(0, 1);
    }

    const celestialBody = items[gridItems.length - 1] as CelestialBody;
    const newItem = generateRandomItem(
      celestialBody,
      sizeOptions,
      `${seed}-${count}`,
    );

    let hasOverlap = false;
    for (const item of gridItems) {
      if (isOverlap(newItem, item) || isItemAligned(newItem, item)) {
        hasOverlap = true;
        break;
      }
    }

    if (!hasOverlap) {
      gridItems.push(newItem);
    }
  }

  return gridItems;
};
