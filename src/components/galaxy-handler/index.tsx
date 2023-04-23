import './style.scss';

import { Galaxy } from '@app/interfaces/galaxy';

export const GalaxyHandler = ({ galaxy }: { galaxy: Galaxy }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const contentStyles = {
    '--galaxy-top-color': galaxy.background.top_color,
    '--galaxy-bottom-color': galaxy.background.bottom_color,
  } as React.CSSProperties;

  return (
    <div className="galaxy-container shadow p-5 m-2 w-fit text-center">
      <h2>User's Galaxy</h2>
      <div style={contentStyles} className="galaxy-content">
        {galaxy.celestialBodies.map((celestialBody) => (
          <>
            <div style={{ color: 'white' }}>
              {`${celestialBody.name} - ${celestialBody.type}`}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
