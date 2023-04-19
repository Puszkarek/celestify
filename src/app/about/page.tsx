import './style.scss';

import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="about-wrapper">
      <main className="about-container shadow">
        <h2 className="about-title">
          A <span className="text-secondary-yellow">Musical</span> Universe
          <span className="block">Tailored</span> Just for{' '}
          <span className="text-primary-pink">You</span>
        </h2>

        <p className="about-item">
          Hey there! Welcome to Celestify, where we blend your music taste with
          an astronomical spin. With the help of Spotify&apos;s API, we
          transform your favorite artists into planets, creating a one-of-a-kind
          musical galaxy just for you.
        </p>

        <p className="about-item">
          Set off on an epic journey through your tailor-made cosmic landscape,
          watching as your solar system evolves in tune with your ever-changing
          musical preferences. Celestify gives you a fresh way to enjoy the
          music you adore, while nudging you to discover hidden treasures and
          rediscover your all-time favorites.
        </p>

        <p className="about-item">
          The coolest part? You can share your musical cosmos with friends!
          Simply send them a unique link, and they can dive right into your
          custom constellation of artists.
        </p>

        <p className="about-item">
          So, what are you waiting for? Let Celestify elevate your music
          experience to stellar new heights - it&apos;s an out-of-this-world
          adventure!
        </p>
      </main>
    </div>
  );
};

export default Home;
