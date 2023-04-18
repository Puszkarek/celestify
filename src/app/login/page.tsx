import './style.scss';

import { Footer } from '@app/components/footer';
import { LoginButton } from '@app/components/login-button';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <main className="login-container">
        <LoginButton />
      </main>
      <Footer />
    </>
  );
};

export default Home;
