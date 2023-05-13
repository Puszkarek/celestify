/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GRID_SIZE } from '@app/constants/grid';
import { GridPositionCalculator } from '@app/helpers/generate-grid-layout';
import { seededRandomGenerator } from '@app/utils/random';

export const FIFTY_GRID_CALCULATOR_POSITIONS: Array<GridPositionCalculator> = [
  // First
  (size, customSeed) => ({
    x:
      (GRID_SIZE - size.width) / 2 - seededRandomGenerator(customSeed, -10, 10),
    y:
      (GRID_SIZE - size.height) / 2 -
      seededRandomGenerator(`${customSeed}-y`, -10, 10),
  }),
  // Second
  (_size, customSeed) => ({
    x: seededRandomGenerator(customSeed, 20, 60),
    y: seededRandomGenerator(`${customSeed}-y`, 20, 60),
  }),
  // Third
  (size, customSeed) => ({
    x: GRID_SIZE - size.width - seededRandomGenerator(customSeed, 20, 60),
    y: seededRandomGenerator(`${customSeed}-y`, 20, 60),
  }),
  // Fourth
  (size, customSeed) => ({
    x: seededRandomGenerator(customSeed, 20, 60),
    y:
      GRID_SIZE -
      size.height -
      seededRandomGenerator(`${customSeed}-y`, 100, 150),
  }),
  // Fifth
  (size, customSeed) => ({
    x: GRID_SIZE - size.width - seededRandomGenerator(customSeed, 20, 60),
    y:
      GRID_SIZE -
      size.height -
      seededRandomGenerator(`${customSeed}-y`, 100, 150),
  }),
];

export const FOURTH_GRID_CALCULATOR_POSITIONS: Array<GridPositionCalculator> = [
  // First
  (_size, customSeed) => ({
    x: seededRandomGenerator(customSeed, 50, 140),
    y: seededRandomGenerator(`${customSeed}-y`, 50, 140),
  }),
  // Second
  (size, customSeed) => ({
    x: GRID_SIZE - size.width - seededRandomGenerator(customSeed, 50, 140),
    y: seededRandomGenerator(`${customSeed}-y`, 80, 140),
  }),
  // Third
  (size, customSeed) => ({
    x: seededRandomGenerator(customSeed, 50, 140),
    y:
      GRID_SIZE -
      size.height -
      seededRandomGenerator(`${customSeed}-y`, 120, 140),
  }),
  // Fourth
  (size, customSeed) => ({
    x: GRID_SIZE - size.width - seededRandomGenerator(customSeed, 50, 140),
    y:
      GRID_SIZE -
      size.height -
      seededRandomGenerator(`${customSeed}-y`, 120, 140),
  }),
];

export const THIRD_GRID_CALCULATOR_POSITIONS: Array<GridPositionCalculator> = [
  // First
  (size, customSeed) => ({
    x: seededRandomGenerator(customSeed, 320, GRID_SIZE - size.width - 320),
    y: seededRandomGenerator(`${customSeed}-y`, 50, 140),
  }),
  // Second
  (size, customSeed) => ({
    x: seededRandomGenerator(customSeed, 80, 110),
    y:
      GRID_SIZE -
      size.width -
      seededRandomGenerator(`${customSeed}-y`, 180, 300),
  }),
  // Third
  (size, customSeed) => ({
    x: GRID_SIZE - size.width - seededRandomGenerator(customSeed, 80, 110),
    y:
      GRID_SIZE -
      size.height -
      seededRandomGenerator(`${customSeed}-y`, 150, 300),
  }),
];

export const SECOND_GRID_CALCULATOR_POSITIONS: Array<GridPositionCalculator> = [
  // First
  (size, customSeed) => ({
    x: GRID_SIZE - size.width - seededRandomGenerator(customSeed, 80, 110),
    y:
      (GRID_SIZE - size.width) / 2 +
      seededRandomGenerator(`${customSeed}-y`, -20, 20),
  }),
  // Second
  (size, customSeed) => ({
    x: seededRandomGenerator(customSeed, 80, 110),
    y:
      (GRID_SIZE - size.width) / 2 +
      seededRandomGenerator(`${customSeed}-y`, -20, 20),
  }),
];
export const FIRST_GRID_CALCULATOR_POSITIONS: Array<GridPositionCalculator> = [
  // First
  (size, customSeed) => ({
    x:
      (GRID_SIZE - size.width) / 2 - seededRandomGenerator(customSeed, -10, 10),
    y:
      (GRID_SIZE - size.height) / 2 -
      seededRandomGenerator(`${customSeed}-y`, -10, 10),
  }),
];
