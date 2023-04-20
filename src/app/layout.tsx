import '@app/styles/global.scss';

import { Footer } from '@app/components/footer';
import { FC, ReactNode } from 'react';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        style={{
          overflow: 'auto !important',
        }}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
