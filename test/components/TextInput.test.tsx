import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import TextInput, { required } from '../../src/components/TextInput';

test('Visible text', () => {
  render(<TextInput value="Faye" />);

  expect(screen.getByRole('textbox')).toBeTruthy();
});

test('autofocus', () => {
  render(<TextInput value="Faye" autoFocus />);

  expect(screen.getByRole('textbox')).toBe(document.activeElement);
});

test('onChange', () => {
  const handleChange = jest.fn();

  render(<TextInput value="" onChange={handleChange} />);

  userEvent.type(screen.getByRole('textbox'), 'F');

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledWith('F');
});

test('validator', () => {
  const validateFn = jest.fn(() => false);

  render(<TextInput value="" validator={validateFn} />);

  expect(validateFn).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('textbox')).toHaveClass('error');
});

test('required export', () => {
  expect(required()).toBe(false);
  expect(required('')).toBe(false);
  expect(required(' ')).toBe(false);
  expect(required('Faye')).toBe(true);
  expect(required('Ana Marie')).toBe(true);
});
