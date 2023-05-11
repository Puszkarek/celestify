'use client';

import './style.scss';

import { Icon } from '@app/components/icon';
import { Exception } from '@app/interfaces/error';
import { HTTP_STATUS_CODE } from '@app/interfaces/http';
import { ICON_NAME } from '@app/interfaces/icon';
import { extractException } from '@app/utils/error';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const getIcon = (isOpen: boolean): JSX.Element => {
  const size = 25;
  return isOpen ? (
    <Icon name={ICON_NAME.x} size={size}></Icon>
  ) : (
    <Icon name={ICON_NAME.arrow_down} size={size}></Icon>
  );
};

const requestLogout = (): TE.TaskEither<Exception, Response> => {
  return TE.tryCatch(
    async () => fetch('/api/logout', { method: 'POST' }),
    extractException,
  );
};

export const AccountDropdown = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  const { push } = useRouter();

  const handleLogout = async (): Promise<void> => {
    const task = requestLogout();
    const either = await task();
    if (E.isLeft(either)) {
      console.error('Error while logging out');
      return;
    }

    const response = either.right;

    if (response.status === HTTP_STATUS_CODE.Ok) {
      push('/login');
    }
  };
  return (
    <DropdownMenu.Root onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Open dropdown options">{getIcon(isOpen)}</button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-content shadow"
          sideOffset={25}
          alignOffset={-90}
          align="start"
        >
          <DropdownMenu.Item onClick={handleLogout} className="dropdown-item">
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
