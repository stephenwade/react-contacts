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
