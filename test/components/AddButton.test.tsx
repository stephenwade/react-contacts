import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AddButton from '../../src/components/AddButton';

test('onClick', () => {
  const handleClick = jest.fn();

  render(<AddButton onClick={handleClick} />);

  screen.getByRole('button').click();

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('tabIndex', () => {
  render(<AddButton tabIndex={2} />);

  expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '2');
});

test('Accessible label', () => {
  render(<AddButton aria-label="My Button" />);

  expect(screen.getByRole('button')).toHaveAccessibleName('My Button');
});
