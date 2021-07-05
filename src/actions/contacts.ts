import { loadingStarted, loadingFinished } from './loading';
import { clearError, error } from './error';
import {
  ActionType,
  AppThunkAction,
  BasicAction,
  Contact,
  ContactRequest,
  EditingContact,
  prepareContactForRequest,
} from '../types';

export const CONTACTS_ENDPOINT =
  'https://avb-contacts-api.herokuapp.com/contacts';

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

const saveNewContactAPI = async (
  contactRequest: ContactRequest
): Promise<Contact> => {
  const result = await fetch(CONTACTS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactRequest),
  });
  if (!result.ok) {
    throw new Error();
  }

  const contact = (await result.json()) as Contact;
  return contact;
};

const saveExistingContactAPI = async (
  contactRequest: ContactRequest,
  id: number
): Promise<Contact> => {
  const result = await fetch(`${CONTACTS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactRequest),
  });
  if (!result.ok) {
    throw new Error();
  }

  const contact = (await result.json()) as Contact;
  return contact;
};

export const loadContacts = (): AppThunkAction => async (dispatch) => {
  dispatch(loadingStarted());
  dispatch(clearError());

  try {
    const contacts = await loadDataAPI();
    dispatch({ type: ActionType.ContactsLoaded, contacts });
  } catch (e) {
    dispatch(error());
    console.log(e);
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

export const editorDirty = (): BasicAction => ({
  type: ActionType.EditorDirty,
});

export const deleteContact =
  (id: number): AppThunkAction =>
  async (dispatch) => {
    dispatch({ type: ActionType.DeleteStarted });
    dispatch(clearError());

    try {
      await deleteContactAPI(id);
    } catch (e) {
      dispatch(error());
      console.log(e);
    }

    dispatch({ type: ActionType.DeleteFinished, id });
    dispatch(unselectContact());
  };

export const tryingToSave = (): BasicAction => ({
  type: ActionType.TriedToSave,
});

export const saveContact =
  (partialContact: EditingContact): AppThunkAction =>
  async (dispatch) => {
    dispatch({ type: ActionType.SaveStarted });
    dispatch(clearError());

    const id = partialContact.id;
    try {
      if (!id) {
        const contact = await saveNewContactAPI(
          prepareContactForRequest(partialContact)
        );

        dispatch({ type: ActionType.SaveFinished, contact });
      } else {
        const contact = await saveExistingContactAPI(
          prepareContactForRequest(partialContact),
          id
        );

        dispatch({ type: ActionType.SaveFinished, contact });
      }
    } catch (e) {
      dispatch(error());
      dispatch({ type: ActionType.SaveCanceled });
      console.log(e);
    }
  };
