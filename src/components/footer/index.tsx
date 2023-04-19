import './style.scss';

import Link from 'next/link';

// TODO: add it to the layout instead of each page
export const Footer = (): JSX.Element => {
  return (
    <footer className="footer-container">
      <Link href="about" className="footer-item">
        About
      </Link>
      <Link href="privacy-policy" className="footer-item">
        Privacy
      </Link>
      <Link href="contact" className="footer-item">
        <span style={{ display: 'block' }} className="link">
          Contact
        </span>
      </Link>

      <span className="footer-item">&copy; 2023</span>
    </footer>
  );
};
