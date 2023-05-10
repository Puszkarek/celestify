/* eslint-disable max-lines-per-function */
import { GRID_ITEM_SIZES, GRID_SIZE } from '@app/constants/grid';
import { CELESTIAL_BODY_TYPES_COUNT } from '@app/constants/poster';
import { loadSVG, resizeItemImageSize } from '@app/helpers/canvas';
import { CelestialBody } from '@app/interfaces/galaxy';
import { FiveCelestialBodiesLayout } from '@app/interfaces/grid-layout';
import {
  PosterCelestialBodyItem,
  PosterGridItem,
  PosterTextItem,
} from '@app/interfaces/poster';
import { extractError } from '@app/utils/error';
import { clone } from '@app/utils/object';
import { seededRandomGenerator } from '@app/utils/random';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

// eslint-disable-next-line max-statements
const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  xPosition: number,
  yPosition: number,
  maxWidth: number,
  lineHeight: number,
): Array<PosterGridItem> => {
  // Set the text color
  context.fillStyle = '#ffd700';
  // Set the font style and size
  context.font = 'normal 30px Bungee';

  const items: Array<PosterGridItem> = [];
  const words = text.split(' ');

  let line = '';
  let mutableYPosition = yPosition;

  for (const [index, word] of words.entries()) {
    const testLine = `${line} ${word}`.trim();
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && index > 0) {
      const textMetrics = context.measureText(line);

      const item: PosterTextItem = {
        type: 'text',
        text: line,
        x: xPosition - textMetrics.width / 2,
        y: mutableYPosition,
        width: textMetrics.width,
        height:
          textMetrics.actualBoundingBoxAscent +
          textMetrics.actualBoundingBoxDescent,
      };

      items.push(item);

      line = word;
      mutableYPosition += lineHeight;
    } else {
      line = testLine;
    }
  }

  const textMetrics = context.measureText(line);

  items.push({
    type: 'text',
    text: line,
    x: xPosition - textMetrics.width / 2,
    y: mutableYPosition,
    width: textMetrics.width,
    height:
      textMetrics.actualBoundingBoxAscent +
      textMetrics.actualBoundingBoxDescent,
  });

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

const parseLayoutItems = async (
  context: CanvasRenderingContext2D,
  initialItem: PosterCelestialBodyItem,
): Promise<Array<PosterGridItem>> => {
  // * Celestial Body
  const { celestialBody } = initialItem;
  // Draw the SVG image instead of the colored box

  const imageElement = await loadSVG(
    `images/celestial-bodies/${celestialBody.type}/${celestialBody.variant}.svg`,
  );

  const item = {
    ...initialItem,
    ...resizeItemImageSize(imageElement, initialItem),
  };

  // * Text
  const textMetrics = context.measureText(celestialBody.name);
  const textHeight =
    textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

  // Calculate text position
  const textY = item.y + item.height + textHeight; // Center align vertically

  // Draw text on the canvas
  return [
    item,
    ...wrapText(
      context,
      celestialBody.name,
      item.x + item.width / 2,
      textY,
      item.width,
      30,
    ),
  ];
};

export const generateFiveCelestialBodiesGrid = (
  context: CanvasRenderingContext2D,
  seed: string,
  items: FiveCelestialBodiesLayout,
): TE.TaskEither<Error, Array<PosterGridItem>> => {
  const availableBodyTypes = clone(CELESTIAL_BODY_TYPES_COUNT);

  return pipe(
    // First
    TE.tryCatch(async () => {
      const celestialBody = items[0];
      const size = sizeToGridSize(celestialBody.size);

      const item: PosterCelestialBodyItem = {
        type: 'celestial-body',
        // Add in the center
        x:
          (GRID_SIZE - size.width) / 2 -
          seededRandomGenerator(Math.random(), -10, 10),
        y:
          (GRID_SIZE - size.height) / 2 -
          seededRandomGenerator(Math.random(), -10, 10),
        ...size,
        celestialBody: {
          ...celestialBody,
          variant: popRandomItemType(availableBodyTypes, celestialBody.type),
        },
      };

      return [...(await parseLayoutItems(context, item))];
    }, extractError),
    // Second
    TE.chain((gridItems) =>
      TE.tryCatch(async () => {
        const celestialBody = items[1];
        const size = sizeToGridSize(celestialBody.size);

        const variant = popRandomItemType(
          availableBodyTypes,
          celestialBody.type,
        );
        const item: PosterCelestialBodyItem = {
          type: 'celestial-body',
          // Add in the center
          ...size,
          x: seededRandomGenerator(Math.random(), 20, 60),
          y: seededRandomGenerator(Math.random(), 20, 60),
          celestialBody: { ...celestialBody, variant },
        };

        return [...gridItems, ...(await parseLayoutItems(context, item))];
      }, extractError),
    ),
    // Third
    TE.chain((gridItems) =>
      TE.tryCatch(async () => {
        const celestialBody = items[2];
        const size = sizeToGridSize(celestialBody.size);

        const variant = popRandomItemType(
          availableBodyTypes,
          celestialBody.type,
        );

        const item: PosterCelestialBodyItem = {
          type: 'celestial-body',
          // Add in the center
          ...size,
          x:
            GRID_SIZE -
            size.width -
            seededRandomGenerator(Math.random(), 20, 60),
          y: seededRandomGenerator(Math.random(), 20, 60),
          celestialBody: { ...celestialBody, variant },
        };

        return [...gridItems, ...(await parseLayoutItems(context, item))];
      }, extractError),
    ),
    // Fourth
    TE.chain((gridItems) =>
      TE.tryCatch(async () => {
        const celestialBody = items[3];
        const size = sizeToGridSize(celestialBody.size);

        const variant = popRandomItemType(
          availableBodyTypes,
          celestialBody.type,
        );

        const item: PosterCelestialBodyItem = {
          type: 'celestial-body',
          // Add in the center
          ...size,
          x: seededRandomGenerator(Math.random(), 20, 60),
          y:
            GRID_SIZE -
            size.height -
            seededRandomGenerator(Math.random(), 100, 150),
          celestialBody: { ...celestialBody, variant },
        };

        return [...gridItems, ...(await parseLayoutItems(context, item))];
      }, extractError),
    ),
    // Fifth
    TE.chain((gridItems) =>
      TE.tryCatch(async () => {
        const celestialBody = items[4];
        const size = sizeToGridSize(celestialBody.size);

        const variant = popRandomItemType(
          availableBodyTypes,
          celestialBody.type,
        );

        const item: PosterCelestialBodyItem = {
          type: 'celestial-body',
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
          celestialBody: { ...celestialBody, variant },
        };

        return [...gridItems, ...(await parseLayoutItems(context, item))];
      }, extractError),
    ),
  );
};
