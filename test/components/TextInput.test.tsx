import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import TextInput, { required } from '../../src/components/TextInput';

test('Visible text', () => {
  render(<TextInput value="Faye" onChange={jest.fn()} />);

  expect(screen.getByRole('textbox')).toBeTruthy();
});

test('autofocus', () => {
  render(<TextInput value="Faye" autoFocus onChange={jest.fn()} />);

  expect(screen.getByRole('textbox')).toEqual(document.activeElement);
});

test('onChange', () => {
  const handleChange = jest.fn();

  render(<TextInput value="" onChange={handleChange} />);

  userEvent.type(screen.getByRole('textbox'), 'F');

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toEqual('F');
});

test('validator', () => {
  const validateFn = jest.fn(() => false);

  render(<TextInput value="" onChange={jest.fn()} validator={validateFn} />);

  expect(validateFn).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('textbox')).toHaveClass('error');
});

test('required export', () => {
  expect(required()).toEqual(false);
  expect(required('')).toEqual(false);
  expect(required(' ')).toEqual(false);
  expect(required('Faye')).toEqual(true);
  expect(required('Ana Marie')).toEqual(true);
});
