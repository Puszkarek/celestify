/* eslint-disable id-length */
import './style.scss';

import { Galaxy } from '@app/interfaces/galaxy';
import Image from 'next/image';

export const CelestialBodiesList = ({
  galaxy,
}: {
  galaxy: Galaxy;
}): JSX.Element => {
  return (
    <div className="celestial-bodies-list-container shadow text-center">
      {galaxy.celestialBodies.map((celestialBody, key) => {
        return (
          <div key={key} className="celestial-bodies-list-item">
            <div className="celestial-bodies-list-item-counter">
              {(key + 1).toString().padStart(2, '0')}.
            </div>
            <Image
              src="/images/illustrations/black-hole.png"
              alt="Celestial body representation"
              width={1024}
              height={1024}
              className="celestial-bodies-list-item-image"
            ></Image>
            <div className="celestial-bodies-list-item-name">
              {celestialBody.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
