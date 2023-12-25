import React from 'react';
import styles from './styles.module.scss';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
  isOpen: boolean;
  className: string | undefined;
  children: React.ReactNode;
};

const DropdownMenu = React.forwardRef<HTMLDivElement, Properties>(
  ({ children, className, isOpen }: Properties, ref) => {
    return (
      <div
        className={getValidClassNames(
          className,
          isOpen ? styles['dropdown-menu'] : 'visually-hidden',
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

export { DropdownMenu };
