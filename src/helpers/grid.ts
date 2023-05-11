/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
'use client';

import { GRID_SIZE } from '@app/constants/grid';
import { celestialBodyDecoder } from '@app/decoders/galaxy';
import { drawItem } from '@app/helpers/canvas';
import { generateFiveCelestialBodiesGrid } from '@app/helpers/generate-grid-layout';
import { addStars } from '@app/helpers/grid-stars';
import { Galaxy } from '@app/interfaces/galaxy';
import { FiveCelestialBodiesLayout } from '@app/interfaces/grid-layout';
import { notUndefined } from '@app/utils/guard';
import { isLeft } from 'fp-ts/lib/Either';

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
    'Lexend Mega',
    'url(/fonts/lexend-mega/medium.ttf)',
  );
  document.fonts.add(await lexendFont.load());

  // * Add footer
  context.fillStyle = '#fefefe';
  context.font = '20px Lexend Mega';

  context.fillText('celestify.space', 800, 1010);
};

export const addItemsToCanvas = async (
  canvasElement: HTMLCanvasElement,
  galaxy: Galaxy,
): Promise<void> => {
  const context = canvasElement.getContext('2d');
  if (!context) {
    return;
  }

  await initCanvas(context, galaxy);

  const celestialBodies = galaxy.celestialBodies
    .slice(0, 5)
    .filter(notUndefined(celestialBodyDecoder).is);

  // TODO: make it a function that uses a a switch and returns the TaskEither
  if (celestialBodies.length === 5) {
    const gridItems = await generateFiveCelestialBodiesGrid(
      context,
      galaxy.id,
      celestialBodies as FiveCelestialBodiesLayout,
    );

    const starItems = await addStars(galaxy.id, galaxy.stars, gridItems);

    const starPromises = starItems.map(async (item) => {
      await drawItem(context, item);
    });

    await Promise.all(starPromises);

    const itemsPromises = gridItems.map(async (item) => {
      await drawItem(context, item);
    });

    await Promise.all(itemsPromises);

    // TODO: add the stars to the gridItems
  }
  if (celestialBodies.length === 4) {
    console.warn('NOT IMPLEMENTED YET');
  }
};
