import * as React from 'react';

import AddButton from './AddButton';
import SidebarListItem from './SidebarListItem';
import { useAppDispatch, useAppSelector } from '../store';
import { newContact, selectContact } from '../actions/contacts';

import './Sidebar.css';

function Sidebar(props: {
  loading: boolean;
  onItemClicked?: () => void;
}): JSX.Element {
  const { contacts, activeContact } = useAppSelector((state) => state.contacts);
  const activeId = activeContact?.id;

  const dispatch = useAppDispatch();

  const { loading, onItemClicked } = props;

  const onContactClick = (contactId: number) => {
    const active = contactId === activeId;

    if (!active) {
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
      {loading ? null : (
        <AddButton
          onClick={() => dispatch(newContact())}
          aria-label="Add contact"
        />
      )}
      <ul>
        {contacts.map((contact) => (
          <SidebarListItem
            key={contact.id}
            contact={contact}
            active={contact.id === activeId}
            onClick={() => {
              onContactClick(contact.id);
              if (onItemClicked) onItemClicked();
            }}
          />
        ))}
        {activeContact && !('id' in activeContact) ? (
          <SidebarListItem new onClick={onItemClicked} />
        ) : null}
        {contacts.length === 0 && !activeContact ? (
          <SidebarListItem empty />
        ) : null}
      </ul>
    </div>
  );
}

export default Sidebar;
