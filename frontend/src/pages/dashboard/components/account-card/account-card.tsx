import styles from './styles.module.scss';
import {
  type AccountGetAllItemResponseDto,
  type AccountUpdateRequestDto,
  type AccountUpdateRequestParamsDto,
} from '~/packages/accounts/libs/types/types.js';
import { Icon } from '~/libs/components/components.js';
import { UpdateAccountPopup } from '~/pages/dashboard/components/components.js';
import { useState } from '~/libs/hooks/hooks.js';
import { useCallback } from '~/libs/hooks/hooks';

type Properties = {
  account: AccountGetAllItemResponseDto;
  onAccountUpdate: (
    payload: AccountUpdateRequestDto & AccountUpdateRequestParamsDto,
  ) => void;
};
const AccountCard: React.FC<Properties> = ({
  account,
  onAccountUpdate,
}: Properties) => {
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);

  const handleUpdateFormClose = useCallback(
    () => setShowUpdateForm(false),
    [setShowUpdateForm],
  );
  const handleUpdateFormOpen = useCallback(
    () => setShowUpdateForm(true),
    [setShowUpdateForm],
  );

  return (
    <li className={styles['card-wrapper']}>
      <Icon className={styles['card-icon']} iconName="coins" />
      <div className={styles['card-details']}>
        <span>{account.name}</span>
        <div className={styles['card-amount-details']}>
          <span className={styles['account-currency']}>{account.currency}</span>
          <span className={styles['account-amount']}>
            {account.amount.toFixed(2)}
          </span>
        </div>
      </div>
      <Icon
        iconName="pencil"
        className={styles['card-edit-icon']}
        onClick={handleUpdateFormOpen}
      />
      <UpdateAccountPopup
        account={account}
        isOpen={showUpdateForm}
        onClose={handleUpdateFormClose}
        onSubmit={onAccountUpdate}
      />
    </li>
  );
};

export { AccountCard };
