import './style.scss';

import { CELESTIAL_BODY_TYPES_COUNT } from '@app/constants/poster';
import Image from 'next/image';
import { FC } from 'react';

const Home: FC = () => {
  const planetList = Object.entries(CELESTIAL_BODY_TYPES_COUNT).map(
    ([celestialBodyName, value]) => {
      let count = -1;
      return Array.from({
        length: value,
      }).map(() => {
        count++;
        return (
          <Image
            className="testing-image"
            key={`${celestialBodyName}-${count}`}
            src={`/images/celestial-bodies/${celestialBodyName}/${count}.svg`}
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
