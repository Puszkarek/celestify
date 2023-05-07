/* eslint-disable max-statements */
'use client';

import { addItemsToCanvas } from '@app/helpers/grid';
import { CelestialBody, Galaxy } from '@app/interfaces/galaxy';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

// TODO: This is a hack to prevent the canvas from being rendered twice, improve this later to use hooks
let isLoading = false;
const PosterHandlerComponent = ({
  galaxy,
}: {
  galaxy: Galaxy;
}): JSX.Element => {
  const canvasReference = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasReference.current) {
      return;
    }
    if (isLoading) {
      return;
    }
    isLoading = true;

    const topItems = galaxy.celestialBodies.slice(0, 5) as [
      CelestialBody,
      ...Array<CelestialBody>,
    ];

    if (topItems.length === 0) {
      throw new Error('No celestial bodies found');
    }

    void addItemsToCanvas(canvasReference.current, galaxy);
  }, []);

  return <canvas ref={canvasReference} height={1024} width={1024} />;
};

export const PosterHandler = dynamic(
  () => Promise.resolve(PosterHandlerComponent),
  {
    ssr: false,
  },
);
