import { loadSVG } from '@app/helpers/canvas';
import { CelestialBody } from '@app/interfaces/galaxy';

type BaseGridItem = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type PosterCelestialBodyItem = {
  type: 'celestial-body';
  celestialBody: CelestialBody & {
    variant: number;
  };
} & BaseGridItem;

export type PosterStarItem = {
  type: 'star';
  url: string;
} & BaseGridItem;

export type PosterTextItem = {
  type: 'text';
  text: string;
} & BaseGridItem;

export type PosterGridItem =
  | PosterCelestialBodyItem
  | PosterStarItem
  | PosterTextItem;
