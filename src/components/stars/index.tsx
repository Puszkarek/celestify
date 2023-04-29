'use client';

import './style.scss';

import { getRandomNumberInRange } from '@app/utils/random';

export const Stars = ({ size }: { size: number }): JSX.Element => {
  return (
    <div className="background-stars-container">
      {Array.from({ length: size }).map((__, index) => {
        const starStyles: React.CSSProperties = {
          marginLeft: `${getRandomNumberInRange(0, 100)}%`,
          marginTop: `${getRandomNumberInRange(0, 100)}%`,

          animation: `flash ${getRandomNumberInRange(1, 10)}s linear infinite`,
        };

        return (
          <div key={index} className="background-star" style={starStyles}></div>
        );
      })}
    </div>
  );
};
