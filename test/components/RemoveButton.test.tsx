import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import RemoveButton from '../../src/components/RemoveButton';

test('onClick', () => {
  const handleClick = jest.fn();

  render(<RemoveButton onClick={handleClick} />);

  userEvent.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('tabIndex', () => {
  render(<RemoveButton tabIndex={2} />);

  expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '2');
});

test('Accessible label', () => {
  render(<RemoveButton aria-label="My Button" />);

  expect(screen.getByRole('button')).toHaveAccessibleName('My Button');
});
