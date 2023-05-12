'use client';
/* eslint-disable max-statements */

import { GRID_SIZE } from '@app/constants/grid';
import { drawItem } from '@app/helpers/canvas';
import {
  generateCelestialBodiesGrid,
  GridPositionCalculator,
} from '@app/helpers/generate-grid-layout';
import {
  FIFTY_GRID_CALCULATOR_POSITIONS,
  FIRST_GRID_CALCULATOR_POSITIONS,
  FOURTH_GRID_CALCULATOR_POSITIONS,
  SECOND_GRID_CALCULATOR_POSITIONS,
  THIRD_GRID_CALCULATOR_POSITIONS,
} from '@app/helpers/grid-layout';
import { addStars } from '@app/helpers/grid-stars';
import { Galaxy } from '@app/interfaces/galaxy';

const createCanvasBackground = (
  context: CanvasRenderingContext2D,
  background: Galaxy['background'],
): CanvasGradient => {
  const angleInRadians = (background.angle * Math.PI) / 180;
  const centerX = context.canvas.width / 2;
  const centerY = context.canvas.height / 2;

  const gradientRadius = Math.sqrt(
    Math.pow(context.canvas.width, 2) + Math.pow(context.canvas.height, 2),
  );

  const startX = centerX + gradientRadius * Math.cos(angleInRadians + Math.PI);
  const startY = centerY + gradientRadius * Math.sin(angleInRadians + Math.PI);
  const endX = centerX + gradientRadius * Math.cos(angleInRadians);
  const endY = centerY + gradientRadius * Math.sin(angleInRadians);

  const gradient = context.createLinearGradient(startX, startY, endX, endY);

  const mappedColors = new Map(background.colors);
  mappedColors.forEach((value, key) => {
    gradient.addColorStop(key, value);
  });

  return gradient;
};

const initCanvas = async (
  context: CanvasRenderingContext2D,
  galaxy: Galaxy,
): Promise<void> => {
  // * Create background
  const gradient = createCanvasBackground(context, galaxy.background);
  context.fillStyle = gradient;
  context.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

  // * Add font for texts (without this, we'll have a racing condition)
  const bungeeFont = new FontFace('Bungee', 'url(/fonts/bungee/regular.ttf)');
  document.fonts.add(await bungeeFont.load());

  const lexendFont = new FontFace(
    'Lexend',
    'url(/fonts/lexend-mega/medium.ttf)',
  );
  document.fonts.add(await lexendFont.load());

  // * Add footer
  // eslint-disable-next-line require-atomic-updates
  context.fillStyle = '#fefefe';
  // eslint-disable-next-line require-atomic-updates
  context.font = '20px Lexend';

  context.fillText('celestify.space', 800, 1010);
};

const getGridItemsPosition = (
  celestialBodiesCount: number,
): Array<GridPositionCalculator> => {
  switch (celestialBodiesCount) {
    case 5: {
      return FIFTY_GRID_CALCULATOR_POSITIONS;
    }
    case 4: {
      return FOURTH_GRID_CALCULATOR_POSITIONS;
    }
    case 3: {
      return THIRD_GRID_CALCULATOR_POSITIONS;
    }
    case 2: {
      return SECOND_GRID_CALCULATOR_POSITIONS;
    }
    case 1: {
      return FIRST_GRID_CALCULATOR_POSITIONS;
    }
    default: {
      return [];
    }
  }
};
export const createGalaxyPoster = async (
  galaxy: Galaxy,
): Promise<string | null> => {
  const canvasElement = document.createElement('canvas');
  canvasElement.width = GRID_SIZE;
  canvasElement.height = GRID_SIZE;
  const context = canvasElement.getContext('2d');
  if (!context) {
    return null;
  }

  await initCanvas(context, galaxy);

  const { celestialBodies, id, stars } = galaxy;

  const itemPositionGeneratorList = getGridItemsPosition(
    celestialBodies.length,
  );
  const gridItems = await generateCelestialBodiesGrid(
    context,
    id,
    celestialBodies,
    itemPositionGeneratorList,
  );

  const starItems = await addStars(id, stars, gridItems);

  const starPromises = starItems.map(async (item) => {
    await drawItem(context, item);
  });

  await Promise.all(starPromises);

  const itemsPromises = gridItems.map(async (item) => {
    await drawItem(context, item);
  });

  await Promise.all(itemsPromises);

  return canvasElement.toDataURL();
};
