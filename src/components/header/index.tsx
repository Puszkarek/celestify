import './style.scss';

import Link from 'next/link';

// TODO: add it to the layout instead of each page
export const Header = (): JSX.Element => {
  return (
    <div className="header-container">
      <Link href="/">
        <h1 className="app-name">Celestify</h1>
      </Link>
    </div>
  );
};
