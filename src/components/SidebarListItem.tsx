import React from 'react';

import { Contact } from '../types';

import './SidebarListItem.css';

function SidebarListItem(
  props:
    | {
        contact: Contact;
        active: boolean;
        onClick?: React.MouseEventHandler<HTMLLIElement>;
      }
    | { new: true }
): JSX.Element {
  if ('new' in props) {
    return <li className="SidebarListItem new active">New contact</li>;
  }

  const { active, contact, onClick } = props;

  return (
    <li
      className={`SidebarListItem ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {contact.firstName} {contact.lastName}
    </li>
  );
}

export default SidebarListItem;
