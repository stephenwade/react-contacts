import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import SidebarListItem from '../../src/components/SidebarListItem';
import { Contact } from '../../src/types';

describe('existing contact', () => {
  const testContact: Contact = {
    id: 61,
    firstName: 'Faye',
    lastName: 'Armstrong',
    emails: [],
  };

  test('Visible text', () => {
    render(<SidebarListItem contact={testContact} active={false} />);

    expect(screen.getByText('Faye Armstrong')).toBeTruthy();
  });

  test('active', () => {
    render(<SidebarListItem contact={testContact} active={false} />);

    expect(document.querySelector('.active')).toBeFalsy();

    render(<SidebarListItem contact={testContact} active={true} />);

    expect(document.querySelector('.active')).toBeTruthy();
  });

  test('onClick', () => {
    const handleClick = jest.fn();

    render(
      <SidebarListItem
        contact={testContact}
        active={false}
        onClick={handleClick}
      />
    );

    userEvent.click(screen.getByText('Faye Armstrong'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('onKeyDown with Enter behaves the same as onClick', () => {
    const handleClick = jest.fn();
    const enterKeyDownEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      key: 'Enter',
    });

    render(
      <SidebarListItem
        contact={testContact}
        active={false}
        onClick={handleClick}
      />
    );

    screen.getByText('Faye Armstrong').dispatchEvent(enterKeyDownEvent);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('new contact', () => {
  test('Visible text', () => {
    render(<SidebarListItem new />);

    expect(screen.getByText('New contact')).toBeTruthy();
  });
});
