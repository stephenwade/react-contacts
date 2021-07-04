import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import EmailsInput from '../../src/components/EmailsInput';
import { NewEmail } from '../../src/types';

const testEmails = [
  'faye.armstrong@brandsource.com',
  'faye@avb.net',
  'farmstrong@exampleu.edu',
];

const testNewEmails: NewEmail[] = [
  { key: 'pwdztjzlkr', email: 'faye1992@gmail.com' },
  { key: 'lwofdr', email: 'hawk' },
];

test('emails', () => {
  render(<EmailsInput emails={testEmails} newEmails={[]} />);

  expect(screen.getByText(testEmails[0])).toBeTruthy();
  expect(screen.getByText(testEmails[1])).toBeTruthy();
  expect(screen.getByText(testEmails[2])).toBeTruthy();
});

test('onEmailRemoveClick', () => {
  const handleEmailRemoveClick = jest.fn();

  render(
    <EmailsInput
      emails={testEmails}
      newEmails={[]}
      onEmailRemoveClick={handleEmailRemoveClick}
    />
  );

  userEvent.click(screen.getAllByLabelText('Remove email')[2]);

  expect(handleEmailRemoveClick).toHaveBeenCalledTimes(1);
  expect(handleEmailRemoveClick).toHaveBeenLastCalledWith(2);
});

test('newEmails', () => {
  render(<EmailsInput emails={[]} newEmails={testNewEmails} />);

  const textboxes = screen.getAllByRole('textbox');

  expect(textboxes[0]).toHaveValue(testNewEmails[0].email);
  expect(textboxes[1]).toHaveValue(testNewEmails[1].email);
});

test('onNewEmailChange', () => {
  const handleNewEmailChange = jest.fn();

  render(
    <EmailsInput
      emails={[]}
      newEmails={testNewEmails}
      onNewEmailChange={handleNewEmailChange}
    />
  );

  userEvent.type(screen.getAllByRole('textbox')[1], 'f');

  expect(handleNewEmailChange).toHaveBeenCalledTimes(1);
  expect(handleNewEmailChange).toHaveBeenCalledWith(
    testNewEmails[1].key,
    `${testNewEmails[1].email}f`
  );
});

test('onNewEmailRemoveClick', () => {
  const handleNewEmailRemoveClick = jest.fn();

  render(
    <EmailsInput
      emails={[]}
      newEmails={testNewEmails}
      onNewEmailRemoveClick={handleNewEmailRemoveClick}
    />
  );

  userEvent.click(screen.getAllByLabelText('Remove email')[0]);

  expect(handleNewEmailRemoveClick).toHaveBeenCalledTimes(1);
  expect(handleNewEmailRemoveClick).toHaveBeenLastCalledWith(
    testNewEmails[0].key
  );
});

test('Add button', () => {
  render(<EmailsInput emails={[]} newEmails={[]} />);

  expect(screen.getByText('add email')).toBeTruthy();
});

test('onAddEmailClick', () => {
  const handleAddEmailClick = jest.fn();

  render(
    <EmailsInput
      emails={[]}
      newEmails={[]}
      onAddEmailClick={handleAddEmailClick}
    />
  );

  userEvent.click(screen.getByText('add email'));

  expect(handleAddEmailClick).toHaveBeenCalledTimes(1);
});

test('hasTriedToSave', () => {
  render(<EmailsInput emails={[]} newEmails={testNewEmails} hasTriedToSave />);

  const textboxes = screen.getAllByRole('textbox');

  expect(textboxes[0]).not.toHaveClass('error');
  expect(textboxes[1]).toHaveClass('error');
});
