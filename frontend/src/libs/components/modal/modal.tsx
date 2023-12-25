import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from '~/libs/hooks/hooks.js';
import { Icon } from '~/libs/components/components';

type Properties = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalTitle?: string | undefined;
};

const Modal: React.FC<Properties> = ({
  isOpen,
  onClose,
  children,
  modalTitle,
}: Properties) => {
  const reference = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (!reference.current) {
      return;
    }

    if (isOpen && !reference.current.hasAttribute('open')) {
      return void reference.current.showModal();
    }
  }, [isOpen, reference]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <dialog ref={reference} className={styles['modal-wrapper']}>
      <div className={styles['inner-content']}>
        <div className={styles['modal-header']}>
          <span className={styles['modal-title']}>{modalTitle}</span>
          <Icon
            className={styles['modal-close-icon']}
            iconName="x-icon"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </dialog>,
    document.body,
  );
};

export { Modal };
