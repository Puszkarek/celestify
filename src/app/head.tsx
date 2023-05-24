import Script from 'next/script';
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
        content="Hey, music lover! Want to see your playlist take on a new form? Create your very own cosmic poster that's as unique as your music taste. Let your favorite songs inspire a visual masterpiece that'll jazz up your space. It's more than just a poster, it's a universe of melodies, all based on your personal jams. Start crafting now, and let your music taste shine in a whole new way!"
      />
      <meta property="og:title" content="Celestify" />
      <meta
        property="og:description"
        content="Craft a unique cosmic poster, inspired by your music taste. Transform your favorite jams into a visual masterpiece. Your playlist, your universe!"
      />
      <meta property="og:url" content="https://celestify.space/" />
      <meta
        property="og:image"
        content="https://celestify.space/images/banner.jpg"
      />
      <meta property="og:type" content="website" />

      <Script
        async
        strategy="lazyOnload"
        id="next-google-adsense"
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
        crossOrigin="anonymous"
      />
    </>
  );
};

export default Head;
