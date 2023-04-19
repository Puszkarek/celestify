import './style.scss';

import { FC } from 'react';

const Contact: FC = () => {
  return (
    <div className="contact-wrapper">
      <main className="contact-container shadow">
        <h2 className="contact-title"> Hey!!!</h2>
        <h2 className="contact-title">
          <span className="block">I&apos;m</span>
          <span className="text-secondary-yellow">Puszkarek</span>
        </h2>

        <p className="contact-item">
          I&apos;m all about blending tech and creativity to build awesome web
          apps that make the digital world more fun and engaging for everyone.
        </p>

        <p className="contact-item">
          When I&apos;m not tinkering with Celestify, I&apos;m usually diving
          into new adventures and picking up cool skills.{' '}
          <span className="line-through opacity-90 text-primary-red">
            (Usually thinking about leaves the society behind and living in a
            cabin in the woods).
          </span>
        </p>

        <p className="contact-item">
          But I&apos;m here now, so if you&apos;d like to chat or have any
          questions, feel free to reach out via{' '}
          <a className="email-link anchor" href="mailto:guipuszkarek@gmail.com">
            email
          </a>{' '}
          or{' '}
          <a
            className="instagram-link anchor"
            href="https://www.instagram.com/_puszkarek_/"
          >
            instagram
          </a>
          . You can also check out my{' '}
          <a className="github-link anchor" href="https://github.com/Puszkarek">
            GitHub
          </a>{' '}
          and{' '}
          <a
            className="linkedin-link anchor"
            href="https://www.linkedin.com/in/guilherme-puszkarek-56bba21a5/"
          >
            LinkedIn
          </a>{' '}
          profiles to get a glimpse of my other projects and interests.
        </p>
      </main>
    </div>
  );
};

export default Contact;
