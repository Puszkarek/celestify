import './style.scss';

import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <main className="privacy-container shadow">
        <h2 className="privacy-title">Hey there!</h2>

        <p className="privacy-item">
          Welcome to Celestify. Your privacy is important, so this policy will
          help you understand what personal information is collected and how
          it&apos;s used when you use the app. By using Celestify, you agree to
          how your personal information is handled, as described here.
        </p>

        <h2 className="privacy-title">
          What Personal Information is Involved?
        </h2>

        <p className="privacy-item">
          In this privacy policy, personal information means any data that can
          be used to identify you. For Celestify, this is limited to the data
          accessed from your Spotify account.
        </p>

        <h2 className="privacy-title">
          How Your Information is Collected and Used
        </h2>
        <p className="privacy-item">
          Celestify connects to your Spotify account to find your top items but
          doesn&apos;t collect or store that data. The only thing that&apos;s
          stored is a token in your cookie, which helps authenticate and
          interact with the Spotify API.
        </p>

        <h2 className="privacy-title">Keeping Your Data Safe</h2>

        <p className="privacy-item">
          The token in your cookie is protected using industry-standard security
          measures to prevent unauthorized access, disclosure, or changes.
          Celestify doesn&apos;t store any other personal information about you.
        </p>

        <h2 className="privacy-title">How Long is Your Data Stored?</h2>

        <p className="privacy-item">
          The token in your cookie is kept only as long as needed to provide the
          services offered by Celestify. You can delete your cookies at any
          time, which also removes the token from your device.
        </p>

        <h2 className="privacy-title">Working with Third-Party Services</h2>

        <p className="privacy-item">
          Celestify uses the Spotify API to access your Spotify account data. By
          using Celestify, you also agree to Spotify&apos;s terms and
          conditions. To learn more about how Spotify handles your personal
          information, check out their privacy policy.
        </p>

        <h2 className="privacy-title">Updates to This Privacy Policy</h2>

        <p className="privacy-item">
          This privacy policy might change every now and then. Any updates will
          be posted here, and the &quot;Last Updated&quot; date at the top will
          be changed accordingly. It&apos;s up to you to check this policy once
          in a while and stay informed about any changes.
        </p>

        <h2 className="privacy-title">Got Questions?</h2>

        <p className="privacy-item">
          If you have any questions or concerns about this privacy policy or how
          your personal information is handled, feel free to contact me,
          Guilherme, at [TODO: My Email Address].
        </p>
      </main>
    </>
  );
};

export default Home;
