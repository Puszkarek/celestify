/* eslint-disable id-length */
import './style.scss';

import { Galaxy } from '@app/interfaces/galaxy';
import Image from 'next/image';

export const OrbitHandler = ({ galaxy }: { galaxy: Galaxy }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const contentStyles = {
    '--orbit-top-color': galaxy.background.top_color,
    '--orbit-bottom-color': galaxy.background.bottom_color,
  } as React.CSSProperties;

  const topFive = galaxy.celestialBodies.slice(0, 3);
  return (
    <div className="orbit-container shadow">
      <div className="orbit-wrap" style={contentStyles}>
        <li className="orbit-ring-wrapper orbit-center">
          <Image
            src="/images/illustrations/black-hole.png"
            alt="Orbit center"
            height={1024}
            width={1024}
          ></Image>
        </li>

        {topFive.map((celestialBody, index) => {
          console.log(celestialBody.type);

          const ringColor = celestialBody.type === 'volcanic' ? 'red' : 'blue';

          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          const ringStyles = {
            '--tw-ring-color': `var(--primary-blue)`,
          } as React.CSSProperties;

          console.log(ringColor);
          return (
            <div className="orbit-ring-wrapper" key={index}>
              <div className={`ring-item ring-item-${index}`}>
                <div className="celestial-body">
                  <div className="orbit-icon">
                    <Image
                      src="/images/illustrations/black-hole.png"
                      alt="Celestial body representation"
                      height={1024}
                      width={1024}
                      className="orbit-icon"
                    ></Image>
                    <div className="celestial-body-name">
                      {celestialBody.name}
                    </div>
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
