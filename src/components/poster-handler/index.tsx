'use client';

import './style.scss';

import { Icon } from '@app/components/icon';
import { Loading } from '@app/components/loading';
import { createGalaxyPoster } from '@app/helpers/grid';
import { getSubTitleFromPathname } from '@app/helpers/grid-text';
import { Galaxy } from '@app/interfaces/galaxy';
import { ICON_NAME } from '@app/interfaces/icon';
import { SpotifyUserData } from '@app/interfaces/spotify';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const PosterHandlerComponent = ({
  galaxy,
  userData,
}: {
  galaxy: Galaxy;
  userData: SpotifyUserData;
}): JSX.Element => {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [imageURI, setImageURI] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const subTitle = getSubTitleFromPathname(pathname ?? '');

    void createGalaxyPoster(galaxy, userData.display_name, subTitle)
      .then((posterURI) => {
        setImageURI(posterURI);
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, [galaxy, isLoaded]);

  return (
    <>
      <div className="poster-container shadow">
        {imageURI ? (
          <Image
            className="poster-image"
            src={imageURI}
            alt="Poster"
            width={1024}
            height={1024}
          ></Image>
        ) : (
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
          <a
            href={imageURI ?? ''}
            download="poster.png"
            className="download-button shadow shadow-interactive"
          >
            <Icon name={ICON_NAME.download} size={30}></Icon>
          </a>
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
