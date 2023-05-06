'use client';

import './style.scss';

import { STAR_TYPES_COUNT } from '@app/constants/poster';
import { Galaxy, GalaxyStarCount } from '@app/interfaces/galaxy';
import { seededRandomGenerator } from '@app/utils/random';
import Image from 'next/image';

type Star = {
  x: number;
  y: number;
  size: number;
  variant: number;
};

// eslint-disable-next-line max-statements
export const generateStars = (
  parameters: GalaxyStarCount,
  starCollectionIndex: number,
): {
  common: Array<Star>;
  rare: Array<Star>;
} => {
  const starCollection = STAR_TYPES_COUNT[
    starCollectionIndex
  ] as GalaxyStarCount;

  const occupiedXPositions = new Set<number>();
  const occupiedYPositions = new Set<number>();

  const commonStars: Array<Star> = [];

  while (commonStars.length < parameters.common) {
    // Check if the `X` position is free
    const xPosition = seededRandomGenerator(commonStars.length / 5, 0, 100);
    if (!occupiedXPositions.has(xPosition)) {
      // Check if the `Y` position is free
      const yPosition = seededRandomGenerator(commonStars.length / 2, 0, 100);
      if (!occupiedYPositions.has(yPosition)) {
        // Add star to the list
        const star: Star = {
          x: xPosition,
          y: yPosition,
          size: seededRandomGenerator(commonStars.length, 3, 8),
          variant: seededRandomGenerator(
            commonStars.length / 1.1,
            0,
            starCollection.common - 1,
          ),
        };
        commonStars.push(star);
      }
    }
  }

  const rareStars: Array<Star> = [];

  while (rareStars.length < parameters.rare) {
    // Check if the `X` position is free
    const xPosition = seededRandomGenerator(commonStars.length / 5, 0, 100);
    if (!occupiedXPositions.has(xPosition)) {
      // Check if the `Y` position is free
      const yPosition = seededRandomGenerator(commonStars.length / 2, 0, 100);
      if (!occupiedYPositions.has(yPosition)) {
        // Add star to the list
        const star: Star = {
          x: seededRandomGenerator(rareStars.length / 5, 0, 100),
          y: seededRandomGenerator(rareStars.length / 2, 0, 100),
          size: seededRandomGenerator(rareStars.length, 20, 30),
          variant: seededRandomGenerator(
            commonStars.length / 1.1,
            0,
            starCollection.rare - 1,
          ),
        };
        rareStars.push(star);
      }
    }
  }

  return {
    common: commonStars,
    rare: rareStars,
  };
};

export const PosterStars = ({
  stars,
  galaxyID,
}: {
  galaxyID: Galaxy['id'];
  stars: GalaxyStarCount;
}): JSX.Element => {
  const seed = galaxyID;
  const starCollectionIndex = Math.floor(
    seededRandomGenerator(seed, 0, STAR_TYPES_COUNT.length - 1),
  );

  const starsStyles = generateStars(stars, starCollectionIndex);

  return (
    <div className="background-stars-container">
      {starsStyles.common.map((star, index) => {
        return (
          <Image
            key={`common${index}`}
            src={`/images/stars/${starCollectionIndex}/common/${star.variant}.svg`}
            alt="Star representation"
            height={32}
            width={32}
            className="background-star"
            style={{
              marginLeft: `${star.x}%`,
              marginTop: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        );
      })}
      {starsStyles.rare.map((star, index) => {
        return (
          <Image
            key={`rare${index}`}
            src={`/images/stars/${starCollectionIndex}/rare/${star.variant}.svg`}
            alt="Star representation"
            height={32}
            width={32}
            className="background-star"
            style={{
              marginLeft: `${star.x}%`,
              marginTop: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        );
      })}
    </div>
  );
};
