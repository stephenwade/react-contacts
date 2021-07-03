import * as React from 'react';

import { Contact } from '../types';

import './SidebarListItem.css';

function SidebarListItem(
  props:
    | {
        contact: Contact;
        active: boolean;
        onClick?: () => void;
      }
    | { new: true }
): JSX.Element {
  if ('new' in props) {
    return (
      <li className="SidebarListItem new active" tabIndex={0}>
        New contact
      </li>
    );
  }

  const { active, contact, onClick } = props;

  return (
    <li
      className={`SidebarListItem ${active ? 'active' : ''}`}
      role="link"
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter') onClick();
            }
          : undefined
      }
      tabIndex={0}
    >
      {contact.firstName} {contact.lastName}
    </li>
  );
}

export default SidebarListItem;
