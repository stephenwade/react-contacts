import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LabelContainer from '../../src/components/LabelContainer';

test('Label associated with contents', () => {
  render(
    <LabelContainer name="firstName" label="First Name">
      <input type="text" />
    </LabelContainer>
  );

  expect(screen.getByRole('textbox')).toHaveAccessibleName('First Name');
});

test('Visible label', () => {
  render(
    <LabelContainer name="firstName" label="First Name">
      <input type="text" />
    </LabelContainer>
  );

  expect(screen.getByLabelText('First Name')).toEqual(
    screen.getByRole('textbox')
  );
});
