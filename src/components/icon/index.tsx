'use client';

import { ICON_NAME } from '@app/interfaces/icon';
import * as icons from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

export type IconProperties = {
  readonly name: ICON_NAME;
  readonly color?: string;
  readonly size: number;
};

export const Icon: FC<IconProperties & HTMLAttributes<HTMLElement>> = ({
  name,
  color,
  size,
}) => {
  // ? It's strongly typed so we can be sure that the icon exists
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const LucideIcon = (
    icons as unknown as Record<
      string,
      (properties: {
        color: string;
        size: number;
        strokeWidth: number;
      }) => JSX.Element
    >
  )[name]!;

  return (
    <LucideIcon strokeWidth={3} color={color ?? 'currentColor'} size={size} />
  );
};
