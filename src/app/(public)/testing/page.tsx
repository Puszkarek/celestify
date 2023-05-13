import './style.scss';

import { CELESTIAL_BODY_TYPES_COUNT } from '@app/constants/poster';
import Image from 'next/image';
import { FC } from 'react';

const Home: FC = () => {
  const planetList = Object.entries(CELESTIAL_BODY_TYPES_COUNT).map(
    ([celestialBodyName, value]) => {
      return value.map((variant) => {
        return (
          <Image
            className="testing-image"
            key={`${celestialBodyName}-${variant}`}
            src={`images/celestial-bodies/${celestialBodyName}/${variant}.svg`}
            alt="Picture of the author"
            width={1024}
            height={1024}
          />
        );
      });
    },
  );

  return (
    <>
      <main className="testing-container"> {planetList.flat()}</main>
    </>
  );
};

export default Home;
