import * as React from 'react';
import { ReactNode } from 'react';

import './LabelContainer.css';

function LabelContainer(props: {
  name: string;
  label: string;
  children: ReactNode;
}): JSX.Element {
  const { name, label, children } = props;

  const labelId = `${name}Label`;

  return (
    <div className="LabelContainer">
      <div className="Label" id={labelId}>
        {label}
      </div>
      {React.isValidElement(children)
        ? React.cloneElement(children, { 'aria-labelledby': labelId })
        : children}
    </div>
  );
}

export default LabelContainer;
