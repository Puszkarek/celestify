/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { GRID_ITEM_SIZES, GRID_SIZE } from '@app/constants/grid';
import { CELESTIAL_BODY_TYPES_COUNT } from '@app/constants/poster';
import { loadSVG } from '@app/helpers/canvas';
import { CelestialBody } from '@app/interfaces/galaxy';
import { PosterGridItem } from '@app/interfaces/poster';
import { extractError } from '@app/utils/error';
import { clone } from '@app/utils/object';
import { seededRandomGenerator } from '@app/utils/random';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

// TODO: move to interfaces
export type FourCelestialBodiesLayout = [
  CelestialBody,
  CelestialBody,
  CelestialBody,
  CelestialBody,
];
export type FiveCelestialBodiesLayout = [
  CelestialBody,
  CelestialBody,
  CelestialBody,
  CelestialBody,
  CelestialBody,
];

const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  xPosition: number,
  yPosition: number,
  maxWidth: number,
  lineHeight: number,
): Array<PosterGridItem> => {
  const items: Array<PosterGridItem> = [];
  const words = text.split(' ');

  let line = '';
  let mutableYPosition = yPosition;

  for (const [index, word] of words.entries()) {
    const testLine = `${line + word} `;
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && index > 0) {
      const textMetrics = context.measureText(line);

      const item: PosterGridItem = {
        x: xPosition - textMetrics.width / 2,
        y: mutableYPosition,
        width: textMetrics.width,
        height:
          textMetrics.actualBoundingBoxAscent +
          textMetrics.actualBoundingBoxDescent,
      };

      items.push(item);
      context.fillText(line, item.x, item.y);
      line = `${word} `;
      mutableYPosition += lineHeight;
    } else {
      line = testLine;
    }
  }
  const textMetrics = context.measureText(line);

  const item: PosterGridItem = {
    x: xPosition - textMetrics.width / 2,
    y: mutableYPosition,
    width: textMetrics.width,
    height:
      textMetrics.actualBoundingBoxAscent +
      textMetrics.actualBoundingBoxDescent,
  };

  items.push(item);
  context.fillText(line, item.x, item.y);

  return items;
};

const popRandomItemType = (
  availableBodyTypes: typeof CELESTIAL_BODY_TYPES_COUNT,
  type: CelestialBody['type'],
): number => {
  const availableTypes = availableBodyTypes[type];
  const variant =
    availableTypes[
      seededRandomGenerator(Math.random(), 0, availableTypes.length - 1)
    ] ?? 0;

  availableBodyTypes[type] = availableTypes.filter((bodyType) => {
    return bodyType !== variant;
  });

  return variant;
};

const sizeToGridSize = (
  size: number,
): {
  width: number;
  height: number;
} => {
  const sizeOptions = GRID_ITEM_SIZES;

  const centerItemSizeIndex = Math.floor(size * (sizeOptions.length - 1));
  const centerItemDimensions =
    sizeOptions[centerItemSizeIndex] ?? sizeOptions[0];

  return { width: centerItemDimensions, height: centerItemDimensions };
};

const addImageTitleToCanvas = (
  context: CanvasRenderingContext2D,
  item: PosterGridItem,
  text: string,
): Array<PosterGridItem> => {
  // Set the text color
  context.fillStyle = '#ffd700';

  // Set the font style and size
  context.font = 'normal 30px Bungee';

  const textMetrics = context.measureText(text);
  const textHeight =
    textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

  // Calculate text position
  const textY = item.y + item.height + textHeight; // Center align vertically
  const yOffset = 15;

  // Draw text on the canvas
  return wrapText(
    context,
    text,
    item.x + item.width / 2,
    textY + yOffset,
    item.width,
    30,
  );
};

export const resizeItemImageSize = (
  svgImage: HTMLImageElement,
  item: PosterGridItem,
): {
  height: number;
  width: number;
} => {
  if (svgImage.width > svgImage.height) {
    // Mode landscape
    const scale = svgImage.height / svgImage.width;
    console.log(scale);

    return {
      width: item.width,
      height: item.height * scale,
    };
  }

  // Mode portrait
  const scale = svgImage.width / svgImage.height;
  return {
    width: item.width * scale,
    height: item.height,
  };
};

export const addItem = async (
  context: CanvasRenderingContext2D,
  item: PosterGridItem,
  celestialBody: CelestialBody & {
    variant: number;
  },
): Promise<Array<PosterGridItem>> => {
  // Draw the SVG image instead of the colored box
  const svgImage = await loadSVG(
    `images/celestial-bodies/${celestialBody.type}/${celestialBody.variant}.svg`,
  );

  const itemSize = resizeItemImageSize(svgImage, item);

  const newItem = { ...item, width: itemSize.width, height: itemSize.height };

  context.drawImage(
    svgImage,
    newItem.x,
    newItem.y,
    newItem.width,
    newItem.height,
  );
  return [
    newItem,
    ...addImageTitleToCanvas(context, newItem, celestialBody.name),
  ];
};

export const generateFiveCelestialBodiesGrid = (
  context: CanvasRenderingContext2D,
  items: FiveCelestialBodiesLayout,
): TE.TaskEither<Error, Array<PosterGridItem>> => {
  const availableBodyTypes = clone(CELESTIAL_BODY_TYPES_COUNT);

  return pipe(
    // First
    TE.tryCatch(async () => {
      const celestialBody = items[0];
      const size = sizeToGridSize(celestialBody.size);
      const item = {
        // Add in the center
        x:
          (GRID_SIZE - size.width) / 2 -
          seededRandomGenerator(Math.random(), -10, 10),
        y:
          (GRID_SIZE - size.height) / 2 -
          seededRandomGenerator(Math.random(), -10, 10),
        ...size,
      };

      const variant = popRandomItemType(availableBodyTypes, celestialBody.type);

      return await addItem(context, item, { ...celestialBody, variant });
    }, extractError),
    // Second
    TE.chain((gridItems) =>
      TE.tryCatch(async () => {
        const celestialBody = items[1];
        const size = sizeToGridSize(celestialBody.size);
        const item: PosterGridItem = {
          // Add in the center
          ...size,
          x: seededRandomGenerator(Math.random(), 20, 60),
          y: seededRandomGenerator(Math.random(), 20, 60),
        };

        const variant = popRandomItemType(
          availableBodyTypes,
          celestialBody.type,
        );

        return [
          ...gridItems,
          ...(await addItem(context, item, { ...celestialBody, variant })),
        ];
      }, extractError),
    ),
    // Third
    TE.chain((gridItems) =>
      TE.tryCatch(async () => {
        const celestialBody = items[2];
        const size = sizeToGridSize(celestialBody.size);
        const item: PosterGridItem = {
          // Add in the center
          ...size,
          x:
            GRID_SIZE -
            size.width -
            seededRandomGenerator(Math.random(), 20, 60),
          y: seededRandomGenerator(Math.random(), 20, 60),
        };

        const variant = popRandomItemType(
          availableBodyTypes,
          celestialBody.type,
        );

        return [
          ...gridItems,
          ...(await addItem(context, item, { ...celestialBody, variant })),
        ];
      }, extractError),
    ),
    // Fourth
    TE.chain((gridItems) =>
      TE.tryCatch(async () => {
        const celestialBody = items[3];
        const size = sizeToGridSize(1);
        const item: PosterGridItem = {
          // Add in the center
          ...size,
          x: seededRandomGenerator(Math.random(), 20, 60),
          y:
            GRID_SIZE -
            size.height -
            seededRandomGenerator(Math.random(), 100, 150),
        };

        const variant = popRandomItemType(
          availableBodyTypes,
          celestialBody.type,
        );

        return [
          ...gridItems,
          ...(await addItem(context, item, { ...celestialBody, variant })),
        ];
      }, extractError),
    ),
    // Fifth
    TE.chain((gridItems) =>
      TE.tryCatch(async () => {
        const celestialBody = items[4];
        const size = sizeToGridSize(1);
        const item: PosterGridItem = {
          // Add in the center
          ...size,
          x:
            GRID_SIZE -
            size.width -
            seededRandomGenerator(Math.random(), 20, 60),
          y:
            GRID_SIZE -
            size.height -
            seededRandomGenerator(Math.random(), 100, 150),
        };

        const variant = popRandomItemType(
          availableBodyTypes,
          celestialBody.type,
        );

        return [
          ...gridItems,
          ...(await addItem(context, item, { ...celestialBody, variant })),
        ];
      }, extractError),
    ),
  );
};
