'use client';

import './style.scss';

import { STAR_TYPES_COUNT } from '@app/constants/galaxy';
import { GalaxyStars } from '@app/interfaces/galaxy';
import { seededRandomGenerator } from '@app/utils/random';
import Image from 'next/image';

const generateStarStyles = (
  index: number,
  sizeRange: {
    min: number;
    max: number;
  },
): {
  styles: React.CSSProperties;
  variant: number;
} => {
  // TODO: Make it do not overlap each other
  const starSize = seededRandomGenerator(
    index / 5,
    sizeRange.min,
    sizeRange.max,
  );

  const starStyles: React.CSSProperties = {
    marginLeft: `${seededRandomGenerator(index, 0, 100)}%`,
    marginTop: `${seededRandomGenerator(index / 2, 0, 100)}%`,
    height: `${starSize}px`,
    width: `${starSize}px`,
  };

  const starVariant = Math.floor(Math.random() * STAR_TYPES_COUNT['common']);

  return {
    styles: starStyles,
    variant: starVariant,
  };
};
export const PosterStars = ({
  stars: { common, rare },
}: {
  stars: GalaxyStars;
}): JSX.Element => {
  return (
    <div className="background-stars-container">
      {Array.from({ length: common }).map((__, index) => {
        const star = generateStarStyles(index, {
          min: 5,
          max: 10,
        });
        return (
          <Image
            key={`common${index}`}
            src={`/images/stars/common/${star.variant}.svg`}
            alt="Star representation"
            height={32}
            width={32}
            className="background-star"
            style={star.styles}
          />
        );
      })}
      {Array.from({ length: rare }).map((__, index) => {
        const star = generateStarStyles(index, {
          min: 35,
          max: 40,
        });
        return (
          <Image
            key={`rare${index}`}
            src={`/images/stars/rare/${star.variant}.svg`}
            alt="Star representation"
            height={32}
            width={32}
            className="background-star"
            style={star.styles}
          />
        );
      })}
    </div>
  );
};
