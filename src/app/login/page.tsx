import './style.scss';

import { LoginButton } from '@app/components/login-button';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <main className="login-container">
        <LoginButton />
      </main>
    </>
  );
};

export default Home;
