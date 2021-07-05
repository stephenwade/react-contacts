import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import EmailsInputListItem from '../../src/components/EmailsInputListItem';

describe('existing email', () => {
  test('Visible text', () => {
    render(<EmailsInputListItem value="faye.armstrong@brandsource.com" />);

    expect(screen.getByText('faye.armstrong@brandsource.com')).toBeTruthy();
  });

  test('Remove button', () => {
    const handleRemoveClick = jest.fn();

    render(
      <EmailsInputListItem
        value="faye.armstrong@brandsource.com"
        onRemoveClick={handleRemoveClick}
      />
    );

    userEvent.click(screen.getByRole('button'));

    expect(handleRemoveClick).toHaveBeenCalledTimes(1);
  });
});

describe('add email button', () => {
  test('Visible text', () => {
    render(<EmailsInputListItem add />);

    expect(screen.getByText('add email')).toBeTruthy();
  });

  test('onAddClick', () => {
    const handleAddClick = jest.fn();

    render(<EmailsInputListItem add onAddClick={handleAddClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(handleAddClick).toHaveBeenCalledTimes(1);
  });

  test('onKeyDown with Enter behaves the same as onAddClick', () => {
    const handleAddClick = jest.fn();
    const enterKeyDownEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      key: 'Enter',
    });

    render(<EmailsInputListItem add onAddClick={handleAddClick} />);

    screen.getByText('add email').dispatchEvent(enterKeyDownEvent);

    expect(handleAddClick).toHaveBeenCalledTimes(1);
  });

  test('onKeyUp with spacebar behaves the same as onAddClick', () => {
    const handleAddClick = jest.fn();
    const spaceKeyUpEvent = new KeyboardEvent('keyup', {
      bubbles: true,
      key: ' ',
    });

    render(<EmailsInputListItem add onAddClick={handleAddClick} />);

    screen.getByText('add email').dispatchEvent(spaceKeyUpEvent);

    expect(handleAddClick).toHaveBeenCalledTimes(1);
  });
});

describe('new email', () => {
  test('Visible text', () => {
    render(<EmailsInputListItem new value="faye.armstrong@brandsource.com" />);

    expect(screen.getByRole('textbox')).toHaveValue(
      'faye.armstrong@brandsource.com'
    );
  });

  test('autoFocus', () => {
    render(<EmailsInputListItem new value="" autoFocus />);

    expect(screen.getByRole('textbox')).toBe(document.activeElement);
  });

  test('hasTriedToSave', () => {
    render(<EmailsInputListItem new value="" />);

    expect(screen.getByRole('textbox')).not.toHaveClass('error');

    render(<EmailsInputListItem new value="" hasTriedToSave />);

    expect(screen.getAllByRole('textbox')[1]).toHaveClass('error');
  });

  test('onChange', () => {
    const handleChange = jest.fn();

    render(
      <EmailsInputListItem
        new
        value=""
        hasTriedToSave
        onChange={handleChange}
      />
    );

    userEvent.type(screen.getByRole('textbox'), 'f');

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toBe('f');
  });

  test('onRemoveClick', () => {
    const handleRemoveClick = jest.fn();

    render(
      <EmailsInputListItem
        new
        value=""
        hasTriedToSave
        onRemoveClick={handleRemoveClick}
      />
    );

    userEvent.click(screen.getByRole('button'));

    expect(handleRemoveClick).toHaveBeenCalledTimes(1);
  });
});
