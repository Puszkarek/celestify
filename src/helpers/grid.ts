/* eslint-disable max-statements */
import { CelestialBody } from '@app/interfaces/galaxy';
import { seededRandomGenerator } from '@app/utils/random';

export type GridItem = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const sizeToGridSize = (
  size: number,
  sizeOptions: [
    {
      width: number;
      height: number;
    },
    ...Array<{
      width: number;
      height: number;
    }>,
  ],
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
  sizeOptions: [
    {
      width: number;
      height: number;
    },
    ...Array<{
      width: number;
      height: number;
    }>,
  ],
  celestialBody: CelestialBody,
  seed: string,
): GridItem => {
  const { width, height } = sizeToGridSize(celestialBody.size, sizeOptions);
  return {
    // TODO: use seed
    x: Math.floor(Math.random() * (21 - width)),
    y: Math.floor(Math.random() * (21 - height)),
    width,
    height,
  };
};

export const isOverlap = (item1: GridItem, item2: GridItem): boolean => {
  return (
    item1.x < item2.x + item2.width &&
    item1.x + item1.width > item2.x &&
    item1.y < item2.y + item2.height &&
    item1.y + item1.height > item2.y
  );
};

export const generateGridItems = (
  items: [CelestialBody, ...Array<CelestialBody>],
  sizeOptions: [
    {
      width: number;
      height: number;
    },
    ...Array<{
      width: number;
      height: number;
    }>,
  ],
  seed: string,
): Array<GridItem> => {
  const gridItems: Array<GridItem> = [];

  // * Start from center
  gridItems.push({
    ...sizeToGridSize(items[0].size, sizeOptions),
    // TODO: use seed
    x: seededRandomGenerator(Math.random(), 7, 8),
    y: seededRandomGenerator(Math.random(), 7, 8),
  });

  let count = 0;
  while (gridItems.length < items.length) {
    count += 0.123;
    const celestialBody = items[gridItems.length - 1] as CelestialBody;
    const newItem = generateRandomItem(
      sizeOptions,
      celestialBody,
      `${seed}-${count}`,
    );

    let hasOverlap = false;
    for (const item of gridItems) {
      if (isOverlap(newItem, item)) {
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
