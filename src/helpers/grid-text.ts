/* eslint-disable max-statements */
import { GRID_WIDTH } from '@app/constants/grid';
import {
  GridItemPosition,
  GridItemSize,
  PosterGridItem,
  PosterTextItem,
} from '@app/interfaces/poster';

export const wrapText = (
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

export const cutCanvasTitle = (
  context: CanvasRenderingContext2D,
  text: string,
  yPosition: number,
  maxWidth: number,
): Omit<PosterTextItem, 'width' | 'height' | 'type'> => {
  const gridCenter = GRID_WIDTH / 2;

  // Don't cut the text if it's not too long
  if (context.measureText(text).width < maxWidth) {
    return {
      text,
      x: gridCenter - context.measureText(text).width / 2,
      y: yPosition,
    };
  }

  let textMetrics = context.measureText(text);
  let parsedText = text;
  while (textMetrics.width > maxWidth) {
    parsedText = `${parsedText.slice(0, -1)}`;
    textMetrics = context.measureText(`${parsedText}...`);
  }

  return {
    text: `${parsedText.trim()}...`,
    x: gridCenter - textMetrics.width / 2,
    y: yPosition,
  };
};

export const getSubTitleFromPathname = (pathname: string): string => {
  if (pathname.includes('short_term')) {
    return new Date().toLocaleString('default', { month: 'long' });
  }
  if (pathname.includes('medium_term')) {
    return 'Last 6 months';
  }
  return 'All time';
};
