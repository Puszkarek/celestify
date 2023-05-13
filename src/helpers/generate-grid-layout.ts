/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { GRID_ITEM_SIZES, GRID_SIZE } from '@app/constants/grid';
import { CELESTIAL_BODY_TYPES_COUNT } from '@app/constants/poster';
import { loadSVG, resizeItemImageSize } from '@app/helpers/canvas';
import { isOverlapping } from '@app/helpers/grid-stars';
import { CelestialBody } from '@app/interfaces/galaxy';
import {
  GridItemPosition,
  GridItemSize,
  PosterCelestialBodyItem,
  PosterGridItem,
  PosterTextItem,
} from '@app/interfaces/poster';
import { clone } from '@app/utils/object';
import { seededRandomGenerator } from '@app/utils/random';

export type GridPositionCalculator = (
  size: GridItemSize,
  seed: string,
) => GridItemPosition;

const MAX_ATTEMPTS = 200;

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
  seed: string,
): number => {
  const availableTypes = availableBodyTypes[type];
  const variant =
    availableTypes[
      seededRandomGenerator(
        seed + availableTypes.length,
        0,
        availableTypes.length - 1,
      )
    ] ?? 0;

  availableBodyTypes[type] = availableTypes.filter((bodyType) => {
    return bodyType !== variant;
  });

  return variant;
};

const sizeToGridSize = (size: number): GridItemSize => {
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
    `/images/celestial-bodies/${celestialBody.type}/${celestialBody.variant}.svg`,
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

// eslint-disable-next-line max-statements
export const generateCelestialBodiesGrid = async (
  context: CanvasRenderingContext2D,
  seed: string,
  celestialBodies: Array<CelestialBody>,
  positionCalculators: Array<GridPositionCalculator>,
): Promise<Array<PosterGridItem>> => {
  const availableBodyTypes = clone(CELESTIAL_BODY_TYPES_COUNT);

  const results: Array<PosterGridItem> = [];

  for (const [index, celestialBody] of celestialBodies.entries()) {
    const size = sizeToGridSize(1);
    const positionCalculator = positionCalculators[index]!;

    let attempts = 0;

    let position: {
      x: number;
      y: number;
    } | null = null;

    const item = {
      type: 'celestial-body' as const,
      // Add in the center
      ...size,
      celestialBody: {
        ...celestialBody,
        variant: popRandomItemType(
          availableBodyTypes,
          celestialBody.type,
          seed,
        ),
      },
    };

    while (attempts < MAX_ATTEMPTS) {
      attempts++;
      const newPosition = positionCalculator(
        size,
        `${seed}${index}-${attempts}`,
      );

      if (
        !isOverlapping(
          {
            ...item,
            ...newPosition,
          },
          results,
        )
      ) {
        position = newPosition;
        break;
      }
    }

    if (!position) {
      console.log('NOT FOUND');
      break;
    }

    const parsedItems = await parseLayoutItems(context, {
      ...item,
      ...position,
    });
    results.push(...parsedItems);
  }

  return results;
};
