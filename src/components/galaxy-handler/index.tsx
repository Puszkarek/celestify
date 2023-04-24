import './style.scss';

import { Galaxy } from '@app/interfaces/galaxy';

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
          <div className="celestial-body-name" key={key}>
            {`${celestialBody.name} - ${celestialBody.type}`}
          </div>
        ))}
      </div>
    </div>
  );
};
