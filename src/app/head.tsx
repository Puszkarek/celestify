import { FC } from 'react';

const Head: FC = () => {
  return (
    <>
      <title>Celestify</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <meta
        name="description"
        content="Celestify is a website that generated your unique solar system"
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
};

export default Head;
