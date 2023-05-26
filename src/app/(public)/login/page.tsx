import './style.scss';

import { AdBanner } from '@app/components/ad-banner';
import { LoginButton } from '@app/components/login-button';
import { BANNER_300_x_250_1, BANNER_320_x_50_1 } from '@app/constants/ad';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <main className="login-container">
        <AdBanner atOptions={BANNER_320_x_50_1} id="1" />

        <header className="login-header">
          <p className="login-intro">
            Turn your historic into a cosmic adventure!
          </p>
        </header>

        <section className="login-explanation shadow">
          <p>
            Welcome, here we transform your{' '}
            <span className="text-secondary-green">Spotify</span> listening data
            into a mesmerizing{' '}
            <span className="text-primary-blue">planetary poster</span>! Each
            planet represents one of your top artists or songs, and the{' '}
            <span className="text-primary-purple">galaxy</span> is a reflection
            of your unique{' '}
            <span className="text-primary-pink">musical taste</span>.
          </p>
        </section>

        <LoginButton />
      </main>
    </>
  );
};

export default Home;
