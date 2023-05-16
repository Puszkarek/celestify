'use client';

import './style.scss';

import { AudioFeatures } from '@app/interfaces/music';
import dynamic from 'next/dynamic';

type StatsBar = {
  name: string;
  color?: string; // TODO: non-optional
  value: number;
};

const audioFeaturesToStatsBars = (
  audioFeatures: AudioFeatures,
): Array<StatsBar> => {
  return [
    {
      name: 'Groovy',
      value: audioFeatures.danceability,
      color: 'pink',
    },
    {
      name: 'Acoustic',
      value: audioFeatures.acousticness,
      color: 'green',
    },
    {
      name: 'Energetic',
      value: audioFeatures.energy,
      color: 'purple',
    },
    {
      name: 'Happy',
      value: audioFeatures.valence,
      color: 'aqua',
    },
  ];
};
const StatsComponent = ({
  audioFeatures,
}: {
  audioFeatures: AudioFeatures;
}): JSX.Element => {
  const statsBars = audioFeaturesToStatsBars(audioFeatures);

  return (
    <>
      <div className="stats-container shadow">
        <h2 className="section-title text-primary-cyan">Average</h2>
        <div className="stats-content">
          {statsBars.map((statsBar, index) => (
            <div key={index} className="stats-item">
              <h3 className="stats-bar-title">{statsBar.name}</h3>
              <div className="stats-bar">
                <div
                  className="stats-bar-fill"
                  style={{
                    height: `${(statsBar.value * 100) / 2}%`,
                    backgroundColor: `var(--primary-${statsBar.color})`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const Stats = dynamic(() => Promise.resolve(StatsComponent), {
  ssr: false,
});
