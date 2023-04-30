// TODO: move to interfaces folder
export type GridItem = {
  x: number;
  y: number;
  size: number;
};

type SizeOptions = [number, ...Array<number>];

const generateRandomItem = (sizeOptions: SizeOptions): GridItem => {
  const size =
    sizeOptions[Math.floor(Math.random() * sizeOptions.length)] ??
    sizeOptions[0];

  return {
    x: Math.floor(Math.random() * (21 - size)),
    y: Math.floor(Math.random() * (21 - size)),
    size,
  };
};

const isOverlap = (item1: GridItem, item2: GridItem): boolean => {
  return (
    item1.x < item2.x + item2.size &&
    item1.x + item1.size > item2.x &&
    item1.y < item2.y + item2.size &&
    item1.y + item1.size > item2.y
  );
};

export const generateGridItems = (
  gridSize: number,
  itemCount: number,
  sizeOptions: SizeOptions,
): Array<GridItem> => {
  const gridItems: Array<GridItem> = [];

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
};
