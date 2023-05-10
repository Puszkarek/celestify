export type PosterGridItem = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PosterImageItem = {
  type: 'image';
  url: HTMLImageElement;
};

export type PosterTextItem = {
  type: 'text';
  text: string;
};

export const drawItem = (
  context: CanvasRenderingContext2D,
  item: PosterImageItem | PosterTextItem,
): void => {
  if (item.type === 'image') {
    // TODO image
    console.log('drawing image');
    return;
  }

  // TODO: draw text
  console.log('drawing text');
};
