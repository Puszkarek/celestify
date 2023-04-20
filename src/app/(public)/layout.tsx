import '@app/styles/global.scss';

import { Header } from '@app/components/header';
import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
