import './style.scss';

import { Galaxy } from '@app/interfaces/galaxy';
import Image from 'next/image';

export const GalaxyHandler = ({ galaxy }: { galaxy: Galaxy }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const contentStyles = {
    '--galaxy-top-color': galaxy.background.top_color,
    '--galaxy-bottom-color': galaxy.background.bottom_color,
  } as React.CSSProperties;

  const topFive = galaxy.celestialBodies.slice(0, 5);
  return (
    <div className="galaxy-container shadow text-center">
      <div style={contentStyles} className="galaxy-content">
        {topFive.map((celestialBody, key) => (
          <div key={key} className="celestial-body">
            <Image
              src="/images/illustrations/black-hole.png"
              alt="Celestial body representation"
              width={1024}
              height={1024}
              className="celestial-body-image"
              style={{
                width: `calc(10% * ${celestialBody.size})`,
              }}
            ></Image>
            <div className="celestial-body-name">{celestialBody.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
