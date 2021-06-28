import React from 'react';

import { Contact } from '../types';

import './SidebarListItem.css';

function SidebarListItem(props: {
  contact: Contact;
  active: boolean;
}): JSX.Element {
  const { active, contact } = props;

  return (
    <li className={`SidebarListItem ${active ? 'active' : ''}`}>
      {contact.firstName} {contact.lastName}
    </li>
  );
}

export default SidebarListItem;
