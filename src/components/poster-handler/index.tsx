/* eslint-disable max-statements */
'use client';

import './style.scss';

import { Icon } from '@app/components/icon';
import { createGalaxyPoster } from '@app/helpers/grid';
import { CelestialBody, Galaxy } from '@app/interfaces/galaxy';
import { ICON_NAME } from '@app/interfaces/icon';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Loading } from '@app/components/loading';

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

  return (
    <>
      <div className="poster-container shadow">
        {!imageURL ? (
          <div>Loading</div>
        ) : (
          /*   <Image
            className="poster-image"
            src={'imageURL'}
            alt="Poster"
            width={1024}
            height={1024}
          ></Image> */
          <div className="poster-container shadow">
            <div className="poster-loading">
              <Loading />
            </div>
          </div>
        )}
      </div>
      <section className="share-container shadow">
        <p className="section-text">
          Share your Galaxy with friends, or download it as a keepsake! Show off
          your stellar taste in music and let others explore your personal
          universe.
        </p>
        <div className="share-buttons-container">
          <button className="download-button shadow shadow-interactive">
            <Icon name={ICON_NAME.download} size={30}></Icon>
          </button>
          <button className="share-button shadow shadow-interactive">
            <Icon name={ICON_NAME.share} size={30}></Icon>
          </button>
        </div>
      </section>
    </>
  );
};

export const PosterHandler = dynamic(
  () => Promise.resolve(PosterHandlerComponent),
  {
    ssr: false,
  },
);
