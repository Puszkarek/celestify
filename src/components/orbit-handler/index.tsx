'use client';

/* eslint-disable id-length */
import './style.scss';

import { Stars } from '@app/components/stars';
import { CelestialBody, Galaxy } from '@app/interfaces/galaxy';
import { getRandomNumberInRange } from '@app/utils/random';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const getRingColor = (ringType: CelestialBody['type']): string => {
  switch (ringType) {
    case 'volcanic': {
      return 'primary-red';
    }
    case 'electric': {
      return 'primary-orange';
    }
    case 'gas-giant': {
      return 'primary-pink';
    }
    case 'black-hole': {
      return 'secondary-black';
    }
    case 'wildlife': {
      return 'primary-green';
    }
    case 'ice': {
      return 'primary-blue';
    }
    case 'oceanic': {
      return 'primary-aqua';
    }
    case 'rocky': {
      return 'primary-brown';
    }
    case 'supernova': {
      return 'primary-yellow';
    }
    default: {
      return 'primary-blue';
    }
  }
};

const OrbitHandlerComponent = ({ galaxy }: { galaxy: Galaxy }): JSX.Element => {
  console.log('orbit');
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const contentStyles = {
    '--orbit-top-color': galaxy.background.top_color,
    '--orbit-bottom-color': galaxy.background.bottom_color,
  } as React.CSSProperties;

  const topFive = galaxy.celestialBodies.slice(0, 3);
  return (
    <div className="orbit-container shadow">
      <div className="orbit-wrap" style={contentStyles}>
        <Stars size={1000} />
        <div className="orbit-center">
          <Image
            src="/images/illustrations/black-hole.png"
            alt="Orbit center"
            height={1024}
            width={1024}
          ></Image>
        </div>

        {topFive.reverse().map((celestialBody, index) => {
          const ringColor = getRingColor(celestialBody.type);

          // Calculate the width and height for each ring based on the ringIndex
          const size = 85 - index * 25;

          const animationSpeed = index * 5;
          const animationDelay = getRandomNumberInRange(0, 20);
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const ringStyles = {
            '--tw-ring-color': `var(--${ringColor})`,
            'height': `${size}%`,
            'width': `${size}%`,
            'animation': `ringRotation ${35 - animationSpeed}s linear infinite`,
            'animationDelay': `-${animationDelay}s`,
          } as React.CSSProperties;

          const iconStyles: React.CSSProperties = {
            animation: `celestialBodyRotation ${
              35 - animationSpeed
            }s linear infinite`,
            animationDelay: `-${animationDelay}s`,
          };

          return (
            <div key={index} className={`ring-wrapper`} style={ringStyles}>
              <div className="celestial-body">
                <div className="orbit-icon" style={iconStyles}>
                  <Image
                    src="/images/illustrations/black-hole.png"
                    alt="Celestial body representation"
                    height={1024}
                    width={1024}
                    style={iconStyles}
                    className="orbit-icon"
                  ></Image>
                  <div className="celestial-body-name">
                    {celestialBody.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const OrbitHandler = dynamic(
  () => Promise.resolve(OrbitHandlerComponent),
  {
    ssr: false,
  },
);
