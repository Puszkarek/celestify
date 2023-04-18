import { FC } from 'react';

import { Footer } from '../footer';

const Layout: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
