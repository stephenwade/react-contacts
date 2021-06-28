import React from 'react';

import AddButton from './AddButton';
import SidebarListItem from './SidebarListItem';
import { useAppSelector } from '../store';

import './Sidebar.css';

function Sidebar(): JSX.Element {
  const { contacts, activeId } = useAppSelector((state) => state.contacts);

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
            active={contact.id === activeId ? true : false}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
