'use client';

import './style.scss';

import { seededRandomGenerator } from '@app/utils/random';

export const Stars = ({ size }: { size: number }): JSX.Element => {
  return (
    <div className="background-stars-container">
      {Array.from({ length: size }).map((__, index) => {
        const starStyles: React.CSSProperties = {
          marginLeft: `${seededRandomGenerator(index, 0, 100)}%`,
          marginTop: `${seededRandomGenerator(index / 2, 0, 100)}%`,

          animation: `flash ${seededRandomGenerator(
            index / 3,
            1,
            10,
          )}s linear infinite`,
        };

        return (
          <div key={index} className="background-star" style={starStyles}></div>
        );
      })}
    </div>
  );
};
