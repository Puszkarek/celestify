import './style.scss';

import Image from 'next/image';

const CELESTIAL_BODY_MEANING: Array<{
  id: string;
  name: string;
  color: string;
  image: {
    size: number;
    position: 'left' | 'right';
  };
  description: JSX.Element;
}> = [
  {
    id: 'black-hole',
    name: 'Black Hole',
    color: 'primary-dark',
    image: {
      size: 0.8,
      position: 'left',
    },
    description: (
      <>
        They have a dark and mysterious aura, thanks to their high{' '}
        <span className="text-primary-orange">energy</span> and the way they
        consume everything around them. Their stillness and rigidity make them
        less <span className="text-primary-magenta">danceable</span>, further
        adding to their enigmatic nature.
      </>
    ),
  },
  {
    id: 'star',
    name: 'Star',
    color: 'primary-blue',
    image: {
      size: 1,
      position: 'right',
    },
    description: (
      <>
        Stars emit a steady, radiant essence, due to their stable{' '}
        <span className="text-primary-orange">energy</span> and controlled
        acousticness. Their moderate to high{' '}
        <span className="text-primary-magenta">danceability</span> encapsulates
        the consistent, radiant character of a star, adding to their captivating
        charm.
      </>
    ),
  },

  {
    id: 'wildlife',
    name: 'Wildlife Planet',
    color: 'primary-green',
    image: {
      size: 0.6,
      position: 'left',
    },
    description: (
      <>
        They display a dynamic, vivid ambiance, attributed to their high{' '}
        <span className="text-primary-orange">energy</span> and high valence.
        Medium to high{' '}
        <span className="text-primary-magenta">danceability</span> mirrors the
        lively activity and motion of the wildlife. The low to medium
        acousticness signifies the{' '}
        <span className="text-secondary-yellow">electric</span> sensation of the
        planet.
      </>
    ),
  },
  {
    id: 'rocky',
    name: 'Rocky Planet',
    color: 'primary-brown',
    image: {
      size: 0.7,
      position: 'right',
    },
    description: (
      <>
        They possess a <span className="text-primary-brown">grounded</span> and{' '}
        <span className="text-secondary-green">natural</span> aura, stemming
        from their lower energy and higher acousticness. The medium to high{' '}
        <span className="text-primary-magenta">danceability</span> symbolizes
        the solid terrain and motion of the planet.
      </>
    ),
  },
  {
    id: 'oceanic',
    name: 'Oceanic Planet',
    color: 'primary-aqua',
    image: {
      size: 0.65,
      position: 'left',
    },
    description: (
      <>
        They generate a <span className="text-primary-aqua">calm</span>,
        tranquil <span className="text-primary-cyan">ambience</span> through
        their low energy and high valence. The low{' '}
        <span className="text-primary-magenta">danceability</span> illustrates
        the stillness and peacefulness of water.
      </>
    ),
  },
  {
    id: 'gas-giant',
    name: 'Gas-Giant Planet',
    color: 'primary-orange',
    image: {
      size: 1,
      position: 'left',
    },
    description: (
      <>
        They emanate an ambient, otherworldly atmosphere, due to their low to
        medium <span className="text-primary-orange">energy</span> and high
        acousticness. Their low to medium{' '}
        <span className="text-primary-magenta">danceability</span> mirrors the
        fluidity of gas and their unhurried motion, adding to their mystical
        charm.
      </>
    ),
  },
  {
    id: 'vulcanic',
    name: 'Volcano Planet',
    color: 'primary-red',
    image: {
      size: 0.75,
      position: 'right',
    },
    description: (
      <>
        They emanate a powerful, theatrical ambiance, due to their high{' '}
        <span className="text-primary-orange">energy</span> and low valence.
        Their medium to high{' '}
        <span className="text-primary-magenta">danceability</span> embodies the
        dynamic essence of <span className="text-primary-red">volcanoes</span>{' '}
        and <span className="text-primary-orange">eruptions</span>, contributing
        to their dramatic appeal.
      </>
    ),
  },
];

export const CelestialBodiesExplanation = (): JSX.Element => {
  return (
    <>
      {CELESTIAL_BODY_MEANING.map(
        ({ id, color, name, image, description }, key) => {
          return (
            <div key={key} className="celestial-body-meaning-container">
              <div className={`celestial-body-meaning-name text-${color}`}>
                {name}
              </div>
              <div className="celestial-body-meaning-content">
                <Image
                  className="celestial-body-meaning-image"
                  style={{
                    width: `calc(${
                      150 * image.size
                    }px * var(--meaning-image-size-multiplier))`,
                    float: image.position,
                  }}
                  src={`/images/${id}/0.svg`}
                  alt="Hey"
                  width={1024}
                  height={1024}
                ></Image>

                <p className="celestial-body-meaning-text">{description}</p>
              </div>
            </div>
          );
        },
      )}
    </>
  );
};
