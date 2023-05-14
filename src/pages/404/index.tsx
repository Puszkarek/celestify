import '@app/styles/global.scss';
import './style.scss';

import { Footer } from '@app/components/footer';
import { Header } from '@app/components/header';
import Link from 'next/link';

const NotFound = (): JSX.Element => {
  return (
    <>
      <div className="not-found-container">
        <Header />
        <main className="not-found-content">
          <div className="not-found-message-icon">¯\(°_o)/¯</div>

          <h2 className="not-found-message">Oh no! Page not found.</h2>
          <Link
            className="not-found-button shadow shadow-interactive"
            href="/login"
          >
            Return to home
          </Link>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
