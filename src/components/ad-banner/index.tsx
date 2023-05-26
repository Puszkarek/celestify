'use client';

import { AtOptions } from '@app/constants/ad';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const AdBannerComponent = ({
  atOptions,
  id,
}: {
  atOptions: AtOptions;
  id: string;
}): JSX.Element => {
  return (
    <div
      id={id}
      className="mx-2 my-5 flex justify-center items-center text-white text-center"
    >
      <Script id={`script-${id}`}>
        {`atOptions = ${JSON.stringify(atOptions)};
        (function() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "//www.highperformancedformats.com/${
              atOptions.key
            }/invoke.js";
            document.getElementById('${id}').appendChild(script);
        })();`}
      </Script>
    </div>
  );
};

export const AdBanner = dynamic(() => Promise.resolve(AdBannerComponent), {
  ssr: false,
});
