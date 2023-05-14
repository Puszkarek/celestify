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
        content="It's a website that generated an unique cosmic poster based on your Spotify listening data."
      />
      <meta property="og:title" content="Celestify" />
      <meta
        property="og:description"
        content="It's a website that generated an unique cosmic poster based on your Spotify listening data."
      />
      <meta property="og:url" content="https://celestify.space/" />
      <meta
        property="og:image"
        content="https://celestify.space/images/banner.jpg"
      />
      <meta property="og:type" content="website" />
    </>
  );
};

export default Head;
