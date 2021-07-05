import * as React from 'react';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import fetch from 'node-fetch';
import {
  getByText,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { store } from '../../src/store';
import { CONTACTS_ENDPOINT } from '../../src/actions/contacts';
import { Contact } from '../../src/types';
import App from '../../src/components/App';

let testContacts: Contact[] = [
  {
    id: 52,
    firstName: 'Stephen',
    lastName: 'Wade',
    emails: ['stephen@stephenwade.me'],
  },
  {
    id: 31,
    firstName: 'Faye',
    lastName: 'Armstrong',
    emails: [
      'faye.armstrong@brandsource.com',
      'faye@avb.net',
      'farmstrong@exampleu.edu',
    ],
  },
  {
    id: 3,
    firstName: 'April',
    lastName: 'Crossfield',
    emails: ['aprilcross@gmail.com'],
  },
];

const testChangeFirstName = `${specialChars.backspace.repeat(4)}ven`;
const testNewFirstName = 'Steven';
const testChangeLastName = `${specialChars.backspace.repeat(3)}ilson`;
const testNewLastName = 'Wilson';
const testNewEmail = 'swilson@exampleu.edu';

const server = setupServer(
  rest.get(CONTACTS_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(testContacts));
  }),

  rest.put(`${CONTACTS_ENDPOINT}/:contactId`, (req, res, ctx) => {
    const { contactId } = req.params;
    const newContact: Contact = {
      ...(req.body as Omit<Contact, 'id'>),
      id: contactId,
    };

    testContacts = testContacts.filter((contact) => contact.id != contactId);
    testContacts.push(newContact);

    return res(ctx.json(newContact));
  }),

  rest.delete(`${CONTACTS_ENDPOINT}/:contactId`, (req, res) => {
    const { contactId } = req.params;

    testContacts = testContacts.filter((contact) => contact.id != contactId);

    return res();
  }),

  rest.post(CONTACTS_ENDPOINT, (req, res, ctx) => {
    const newContactId = 100 + Math.floor(Math.random() * 900);
    const newContact: Contact = {
      ...(req.body as Omit<Contact, 'id'>),
      id: newContactId,
    };

    if (newContact.firstName === 'Error')
      throw new Error('Intentional error thrown by test');

    testContacts.push(newContact);

    return res(ctx.json(newContact));
  })
);

// @react/dialog depends on `window.matchMedia`, but it is not defined by jsdom
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// loading contacts depends on `window.fetch`, but it is not defined by jsdom
Object.defineProperty(window, 'fetch', {
  writable: true,
  value: fetch,
});

const renderAppAndWaitForLoad = async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // The Add button is hidden until the contacts load
  await screen.findAllByRole('button', { name: 'Add contact' });
};

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('Sidebar', () => {
  test('Can add a new contact', async () => {
    await renderAppAndWaitForLoad();

    userEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.getByText('New contact')).toBeTruthy();
    expect(screen.getByLabelText('First Name')).toBeTruthy();
  });

  test('Clicking the add button twice does not change the state', async () => {
    await renderAppAndWaitForLoad();

    userEvent.click(screen.getAllByRole('button')[0]);

    userEvent.type(screen.getByLabelText('First Name'), 'Aabria');

    userEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.getByLabelText('First Name')).toHaveValue('Aabria');
  });

  test('Can select an existing contact', async () => {
    await renderAppAndWaitForLoad();

    const { firstName, lastName } = testContacts[0];
    const sidebarItem = screen.getByText(`${firstName} ${lastName}`);

    userEvent.click(sidebarItem);

    expect(screen.getByLabelText('First Name')).toHaveValue(firstName);
  });

  test('Focuses the First Name textbox when contact is selected', async () => {
    await renderAppAndWaitForLoad();

    const { firstName, lastName } = testContacts[0];
    const sidebarItem = screen.getByText(`${firstName} ${lastName}`);

    userEvent.click(sidebarItem);

    const lastNameInput = screen.getByLabelText('Last Name');
    userEvent.click(lastNameInput);
    expect(lastNameInput).toBe(document.activeElement);

    userEvent.click(sidebarItem);
    const firstNameInput = screen.getByLabelText('First Name');
    expect(firstNameInput).toBe(document.activeElement);
  });
});

describe('ContactEditor', () => {
  test('Can click Cancel to close contact', async () => {
    await renderAppAndWaitForLoad();

    expect(
      screen.queryByText('Click a contact to view or edit it.')
    ).toBeNull();

    userEvent.click(screen.getByText('Cancel'));
    expect(
      screen.getByText(/Click a contact to view or edit it\./)
    ).toBeTruthy();
  });

  test('Can edit first name', async () => {
    await renderAppAndWaitForLoad();

    const { firstName, lastName } = testContacts[0];
    const sidebarItem = screen.getByText(`${firstName} ${lastName}`);
    userEvent.click(sidebarItem);

    const firstNameInput = screen.getByLabelText('First Name');
    expect(firstNameInput).toHaveValue('Stephen');

    userEvent.type(firstNameInput, testChangeFirstName);

    expect(firstNameInput).toHaveValue(testNewFirstName);
  });

  test('Can edit last name', async () => {
    await renderAppAndWaitForLoad();

    const lastNameInput = screen.getByLabelText('Last Name');
    expect(lastNameInput).toHaveValue('Wade');

    userEvent.type(lastNameInput, testChangeLastName);

    expect(lastNameInput).toHaveValue(testNewLastName);
  });

  test('Can remove existing email', async () => {
    await renderAppAndWaitForLoad();

    const { emails } = testContacts[0];
    expect(screen.queryByText(emails[0])).not.toBeNull();

    const removeButtons = screen.getAllByRole('button', {
      name: 'Remove email',
    });
    expect(removeButtons).toHaveLength(1);

    userEvent.click(removeButtons[0]);
    expect(screen.queryByText(emails[0])).toBeNull();
  });

  test('Can add new email', async () => {
    await renderAppAndWaitForLoad();

    userEvent.type(
      screen.getByRole('button', { name: 'add email' }),
      testNewEmail
    );

    expect(screen.getByRole('textbox', { name: 'New email' })).toHaveValue(
      testNewEmail
    );
  });

  test('Can remove new email', async () => {
    await renderAppAndWaitForLoad();

    const removeButtons = screen.getAllByRole('button', {
      name: 'Remove email',
    });
    expect(removeButtons).toHaveLength(1);

    userEvent.click(removeButtons[0]);
    expect(screen.queryByRole('textbox', { name: 'New email' })).toBeNull();
  });

  test('Can save contact', async () => {
    await renderAppAndWaitForLoad();

    userEvent.click(screen.getByText('Save'));

    await screen.findByRole('link', { name: 'Steven Wilson' });
    expect(screen.queryByRole('textbox', { name: 'New email' })).toBeNull();
  });

  test('Can delete contact', async () => {
    await renderAppAndWaitForLoad();

    userEvent.click(screen.getByText('Delete'));

    await screen.findByText('Are you sure you want to delete this contact?');

    userEvent.click(getByText(screen.getByRole('dialog'), 'Delete'));

    await waitForElementToBeRemoved(screen.queryByText('Steven Wilson'));
  });

  test('Can add a new contact', async () => {
    await renderAppAndWaitForLoad();

    userEvent.click(screen.getAllByRole('button')[0]);

    userEvent.type(screen.getByLabelText('First Name'), 'Alix');
    userEvent.type(screen.getByLabelText('Last Name'), 'Gray');
    userEvent.type(
      screen.getByRole('button', { name: 'add email' }),
      'ag@example.com'
    );
    userEvent.click(screen.getByText('Save'));

    await screen.findByRole('link', { name: 'Alix Gray' });
    expect(screen.getByText('ag@example.com')).toBeTruthy();
    expect(screen.queryByRole('textbox', { name: 'New email' })).toBeNull();
  });
});

describe('Error toast', () => {
  test('Appears when the server returns an error', async () => {
    await renderAppAndWaitForLoad();

    userEvent.click(screen.getAllByRole('button')[0]);

    // The mock API will throw an error if the name fields contain 'Error'
    userEvent.type(screen.getByLabelText('First Name'), 'Error');
    userEvent.type(screen.getByLabelText('Last Name'), 'Error');
    userEvent.click(screen.getByText('Save'));

    await screen.findByText('Something went wrong.');
  });
});
