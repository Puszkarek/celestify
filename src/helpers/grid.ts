/* eslint-disable func-style */
export type GridItem = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function generateRandomItem(
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
): GridItem {
  const { width, height } =
    sizeOptions[Math.floor(Math.random() * sizeOptions.length)] ??
    sizeOptions[0];
  return {
    x: Math.floor(Math.random() * (21 - width)),
    y: Math.floor(Math.random() * (21 - height)),
    width,
    height,
  };
}

export function isOverlap(item1: GridItem, item2: GridItem): boolean {
  return (
    item1.x < item2.x + item2.width &&
    item1.x + item1.width > item2.x &&
    item1.y < item2.y + item2.height &&
    item1.y + item1.height > item2.y
  );
}

export function generateGridItems(
  itemCount: number,
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
): Array<GridItem> {
  const gridItems: Array<GridItem> = [];

  // Start from center
  gridItems.push({
    x: 10 - 3,
    y: 10 - 3,
    width: 5,
    height: 6,
  });

  while (gridItems.length < itemCount) {
    const newItem = generateRandomItem(sizeOptions);

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
}
