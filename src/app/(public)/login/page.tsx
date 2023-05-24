import './style.scss';

import { AdBanner } from '@app/components/ad-banner';
import { LoginButton } from '@app/components/login-button';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <main className="login-container">
        <div className="min-w-[320px] shadow">
          <AdBanner
            data-ad-slot="7469414338"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></AdBanner>
        </div>
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
