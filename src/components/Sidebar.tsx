import React from 'react';

import AddButton from './AddButton';
import SidebarListItem from './SidebarListItem';
import { useAppDispatch, useAppSelector } from '../store';
import { selectContact, unselectContact } from '../actions/contacts';

import './Sidebar.css';

function Sidebar(): JSX.Element {
  const { contacts, activeId } = useAppSelector((state) => state.contacts);
  const dispatch = useAppDispatch();

  const onContactClick = (contactId: number) => {
    const active = contactId === activeId;

    // TODO: Check if ContactEditor is dirty and ask for confirmation

    if (active) {
      dispatch(unselectContact());
    } else {
      dispatch(selectContact(contactId));
    }
  };

  contacts.sort((a, b) => {
    const fullNameA = `${a.firstName} ${a.lastName}`;
    const fullNameB = `${b.firstName} ${b.lastName}`;

    if (fullNameA < fullNameB) return -1;
    if (fullNameA > fullNameB) return 1;
    return 0;
  });

  return (
    <div className="Sidebar">
      <h1>Contacts</h1>
      <AddButton />
      <ul>
        {contacts.map((contact) => (
          <SidebarListItem
            key={contact.id}
            contact={contact}
            active={contact.id === activeId}
            onClick={() => onContactClick(contact.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
