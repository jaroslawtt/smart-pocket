import { type AccountGetAllItemResponseDto } from '~/packages/accounts/accounts.js';
import styles from './styles.module.scss';

type Properties = {
  account: AccountGetAllItemResponseDto;
};
const AccountCard: React.FC<Properties> = ({ account }: Properties) => {
  return (
    <div className={styles['card-wrapper']}>
      <span>{account.name}</span>
      <span>{account.amount}</span>
      <span>{account.currency}</span>
    </div>
  );
};

export { AccountCard };
