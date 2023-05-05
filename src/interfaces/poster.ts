export type PosterItemSize = {
  width: number;
  height: number;
};

export type PosterItemPossibleSizes = [
  PosterItemSize,
  ...Array<PosterItemSize>,
];

export type PosterItem = {
  x: number;
  y: number;
  width: number;
  height: number;
};
