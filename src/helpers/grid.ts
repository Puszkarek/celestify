/* eslint-disable max-statements */
'use client';

import { GRID_SIZE } from '@app/constants/grid';
import { CELESTIAL_BODY_TYPES_COUNT } from '@app/constants/poster';
import { Galaxy } from '@app/interfaces/galaxy';
import { PosterItem } from '@app/interfaces/poster';
import { clone } from '@app/utils/object';

const loadSVG = async (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.src = url;
  });
};

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isOverlapping = (
  newRect: PosterItem,
  existingRects: Array<PosterItem>,
): boolean => {
  for (const rect of existingRects) {
    if (
      newRect.x < rect.x + rect.width &&
      newRect.x + newRect.width > rect.x &&
      newRect.y < rect.y + rect.height &&
      newRect.y + newRect.height > rect.y
    ) {
      return true;
    }
  }
  return false;
};

const createCanvasBackground = (
  context: CanvasRenderingContext2D,
  background: Galaxy['background'],
): CanvasGradient => {
  console.log('BACKGROUND-0', background);
  const canvasWidth = GRID_SIZE;
  const canvasHeight = GRID_SIZE;
  const angleInRadians = (background.angle * Math.PI) / 180;

  const startX =
    canvasWidth / 2 + (Math.cos(angleInRadians + Math.PI) * canvasWidth) / 2;
  const startY =
    canvasHeight / 2 + (Math.sin(angleInRadians + Math.PI) * canvasHeight) / 2;
  const endX = canvasWidth / 2 + (Math.cos(angleInRadians) * canvasWidth) / 2;
  const endY = canvasHeight / 2 + (Math.sin(angleInRadians) * canvasHeight) / 2;

  const gradient = context.createLinearGradient(startX, startY, endX, endY);

  const mappedColors = new Map(background.colors);
  mappedColors.forEach((value, key) => {
    gradient.addColorStop(key, value);
  });

  return gradient;
};

export const addItemsToCanvas = async (
  canvasElement: HTMLCanvasElement,
  galaxy: Galaxy,
): Promise<void> => {
  const availableBodyTypes = clone(CELESTIAL_BODY_TYPES_COUNT);

  const items: Array<PosterItem> = [];

  const context = canvasElement.getContext('2d');
  if (!context) {
    return;
  }
  // Create gradient
  const gradient = createCanvasBackground(context, galaxy.background);
  context.fillStyle = gradient;
  context.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

  const addItems = async (isCenterItem: boolean): Promise<void> => {
    const maxAttempts = 50;

    const item: PosterItem = {
      width: 300,
      height: 300,
      x: 0,
      y: 0,
    };

    if (isCenterItem) {
      item.x = (GRID_SIZE - item.width) / 2;
      item.y = (GRID_SIZE - item.height) / 2;
    } else {
      let attempts = 0;
      let positionFound = false;

      while (attempts < maxAttempts && !positionFound) {
        item.x = randomInt(0, GRID_SIZE - item.width);
        item.y = randomInt(0, GRID_SIZE - item.height);

        if (!isOverlapping(item, items)) {
          positionFound = true;
        } else {
          attempts++;
        }
      }

      if (!positionFound) {
        return; // If no suitable position is found, exit the function early
      }
    }

    items.push(item);

    // Draw the SVG image instead of the colored box
    const svgImage = await loadSVG('images/celestial-bodies/black-hole/0.svg');

    context.drawImage(svgImage, item.x, item.y, item.width, item.height);
  };

  const numberItems = 5;
  for (let index = 0; index < numberItems; index++) {
    console.log('looping');
    await addItems(index === 0);
  }
};
