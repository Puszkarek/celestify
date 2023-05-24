/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const AdBannerComponent = (props: object): JSX.Element => {
  useEffect(() => {
    try {
      console.log('aaaaaaa', (window as any).adsbygoogle);
      /* 
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      ); */
    } catch (error) {
      console.log('push error');
      console.log(error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: 'block',
        overflow: 'hidden',
      }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      {...props}
    />
  );
};
export const AdBanner = dynamic(() => Promise.resolve(AdBannerComponent), {
  ssr: false,
});
