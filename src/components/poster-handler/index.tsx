/* eslint-disable max-statements */
'use client';

import './style.scss';

import { createGalaxyPoster } from '@app/helpers/grid';
import { CelestialBody, Galaxy } from '@app/interfaces/galaxy';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// TODO: This is a hack to prevent the canvas from being rendered twice, improve this later to use hooks
let isLoading = false;
const PosterHandlerComponent = ({
  galaxy,
}: {
  galaxy: Galaxy;
}): JSX.Element => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  useEffect(() => {
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

    void createGalaxyPoster(galaxy).then((posterURI) => {
      setImageURL(posterURI);
    });
  }, []);

  if (!imageURL) {
    return <div className="poster-container shadow">Loading</div>;
  }

  return (
    <div className="poster-container shadow">
      <Image
        className="poster-image"
        src={imageURL}
        alt="Poster"
        width={1024}
        height={1024}
      ></Image>
    </div>
  );
};

export const PosterHandler = dynamic(
  () => Promise.resolve(PosterHandlerComponent),
  {
    ssr: false,
  },
);
