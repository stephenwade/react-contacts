import { loadingStarted, loadingFinished } from './loading';
import { error } from './error';
import {
  ActionType,
  AppThunkAction,
  BasicAction,
  Contact,
  EditingContact,
} from '../types';

const CONTACTS_ENDPOINT = 'https://avb-contacts-api.herokuapp.com/contacts';

const loadDataAPI = async (): Promise<Contact[]> => {
  const result = await fetch(CONTACTS_ENDPOINT);
  if (!result.ok) {
    throw new Error();
  }

  const contacts = (await result.json()) as Contact[];
  return contacts;
};

const deleteContactAPI = async (id: number): Promise<void> => {
  const result = await fetch(`${CONTACTS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
  if (!result.ok) {
    throw new Error();
  }
};

export const loadContacts = (): AppThunkAction => async (dispatch) => {
  dispatch(loadingStarted());

  try {
    const contacts = await loadDataAPI();
    dispatch({ type: ActionType.ContactsLoaded, contacts });
  } catch (e) {
    dispatch(error());
  }

  dispatch(loadingFinished());
};

export const newContact = (): BasicAction => ({
  type: ActionType.ContactNew,
});

export const selectContact = (id: number): BasicAction => ({
  type: ActionType.ContactSelect,
  id,
});

export const unselectContact = (): BasicAction => ({
  type: ActionType.ContactSelect,
  id: undefined,
});

export const setActiveContact = (contact: EditingContact): BasicAction => ({
  type: ActionType.ContactSet,
  contact,
});

export const deleteContact =
  (id: number): AppThunkAction =>
  async (dispatch) => {
    dispatch({ type: ActionType.DeleteStarted });

    try {
      await deleteContactAPI(id);
    } catch (e) {
      dispatch(error());
    }

    dispatch({ type: ActionType.DeleteFinished, id });
    dispatch(unselectContact());
  };
