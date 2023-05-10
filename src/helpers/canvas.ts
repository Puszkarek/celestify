/* eslint-disable unicorn/consistent-destructuring */
import { PosterGridItem } from '@app/interfaces/poster';

export const loadSVG = async (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.src = url;
  });
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

export const drawItem = async (
  context: CanvasRenderingContext2D,
  item: PosterGridItem,
): Promise<void> => {
  if (item.type === 'celestial-body') {
    const { celestialBody } = item;
    // Draw the SVG image instead of the colored box
    const imageElement = await loadSVG(
      `images/celestial-bodies/${celestialBody.type}/${celestialBody.variant}.svg`,
    );

    context.drawImage(imageElement, item.x, item.y, item.width, item.height);
    return;
  }
  if (item.type === 'star') {
    const imageElement = await loadSVG(item.url);

    const itemSize = resizeItemImageSize(imageElement, item);

    context.drawImage(
      imageElement,
      item.x,
      item.y,
      itemSize.width,
      itemSize.height,
    );
    return;
  }

  // Set the text color
  context.fillStyle = '#ffd700';
  // Set the font style and size
  context.font = 'normal 30px Bungee';

  context.fillText(item.text, item.x, item.y + item.height);
};
