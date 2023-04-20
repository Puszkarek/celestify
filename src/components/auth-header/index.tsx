'use client';

import './style.scss';

import { AccountDropdown } from '@app/components/account-dropdown';
import Link from 'next/link';

export const AuthHeader = (): JSX.Element => {
  return (
    <div className="auth-header-container">
      <Link href="/">
        <h1 className="app-name">Celestify</h1>
      </Link>

      <AccountDropdown></AccountDropdown>
    </div>
  );
};
