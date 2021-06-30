import { loadingStarted, loadingFinished } from './loading';
import { error } from './error';
import { ActionType, AppThunkAction, BasicAction, Contact } from '../types';

const CONTACTS_ENDPOINT = 'https://avb-contacts-api.herokuapp.com/contacts';

const loadData = async (): Promise<Contact[]> => {
  const result = await fetch(CONTACTS_ENDPOINT);
  if (!result.ok) {
    throw new Error();
  }

  const contacts = (await result.json()) as Contact[];
  return contacts;
};

export const loadContacts = (): AppThunkAction => async (dispatch) => {
  dispatch(loadingStarted());

  try {
    const contacts = await loadData();
    dispatch({ type: ActionType.ContactsLoaded, contacts });
  } catch (e) {
    dispatch(error());
    throw e;
  }

  dispatch(loadingFinished());
};

export const selectContact = (id: number): BasicAction => ({
  type: ActionType.ContactSelect,
  id,
});

export const unselectContact = (): BasicAction => ({
  type: ActionType.ContactSelect,
  id: null,
});
