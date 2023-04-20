import '@app/styles/global.scss';

import { AuthHeader } from '@app/components/auth-header';
import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <AuthHeader />
      {children}
    </>
  );
};

export default Layout;
