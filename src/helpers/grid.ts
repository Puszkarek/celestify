/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
'use client';

import { GRID_SIZE } from '@app/constants/grid';
import { celestialBodyDecoder } from '@app/decoders/galaxy';
import { loadSVG } from '@app/helpers/canvas';
import {
  FiveCelestialBodiesLayout,
  generateFiveCelestialBodiesGrid,
} from '@app/helpers/generate-grid-layout';
import { CelestialBody, Galaxy } from '@app/interfaces/galaxy';
import { PosterGridItem } from '@app/interfaces/poster';
import { notUndefined } from '@app/utils/guard';
import { isLeft } from 'fp-ts/lib/Either';

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

const addStars = async (
  context: CanvasRenderingContext2D,
  currentGridItems: Array<PosterGridItem>,
): Promise<void> => {
  const maxAttempts = 10;

  // TODO: overlapping the text
  console.log('started items', currentGridItems);
  const starItems: Array<PosterGridItem> = [...currentGridItems];

  while (starItems.length < 80) {
    const item: PosterGridItem = {
      // TODO: missing the type (common, rare)
      // TODO: random size
      width: 15,
      height: 15,
      x: 0,
      y: 0,
    };

    let attempts = 0;
    let positionFound = false;

    while (attempts < maxAttempts && !positionFound) {
      item.x = randomInt(0, GRID_SIZE - item.width);
      item.y = randomInt(0, GRID_SIZE - item.height);

      // TODO: fix it not working, the items are being overlapped
      if (
        starItems.some((rect) => {
          return (
            item.x < rect.x + rect.width &&
            item.x + item.width > rect.x &&
            item.y < rect.y + rect.height &&
            item.y + item.height > rect.y
          );
        })
      ) {
        attempts++;
      } else {
        console.log('is not overlapping');
        positionFound = true;
      }
    }

    if (!positionFound) {
      return; // If no suitable position is found, exit the function early
    }
    starItems.push(item);

    // Draw the SVG image instead of the colored box
    // eslint-disable-next-line no-await-in-loop
    const starImage = await loadSVG('images/stars/0/common/0.svg');

    context.drawImage(starImage, item.x, item.y, item.width, item.height);
  }
};

export const addItemsToCanvas = async (
  canvasElement: HTMLCanvasElement,
  galaxy: Galaxy,
): Promise<void> => {
  const context = canvasElement.getContext('2d');
  if (!context) {
    return;
  }

  // Create gradient
  const gradient = createCanvasBackground(context, galaxy.background);
  context.fillStyle = gradient;
  context.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

  // Add font for texts (without this, we'll have a racing condition)
  const bungeeFont = new FontFace('Bungee', 'url(/fonts/bungee/regular.ttf)');
  const fontFace = await bungeeFont.load();
  document.fonts.add(fontFace);

  const celestialBodies = galaxy.celestialBodies
    .slice(0, 5)
    .filter(notUndefined(celestialBodyDecoder).is);

  // TODO: make it a function that uses a a switch and returns the TaskEither
  if (celestialBodies.length === 5) {
    const task = generateFiveCelestialBodiesGrid(
      context,
      celestialBodies as FiveCelestialBodiesLayout,
    );

    // TODO: needs the list of items in the grid so we can add the stars
    const result = await task();

    if (isLeft(result)) {
      return;
    }
    const gridItems = result.right;

    await addStars(context, gridItems);
  }
  if (celestialBodies.length === 4) {
    console.warn('NOT IMPLEMENTED YET');
  }
};
