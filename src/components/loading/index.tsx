'use client';

import './style.scss';

import { FC } from 'react';

// TODO: improve it later
export const Loading: FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-block"></div>
      <div className="loading-block"></div>
    </div>
  );
};
