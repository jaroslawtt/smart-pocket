import styles from './styles.module.scss';
import { type AccountGetAllItemResponseDto } from '~/packages/accounts/libs/types/types.js';
import { Icon, Link } from '~/libs/components/components.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { ValueOf } from '~/libs/types/types.js';

type Properties = {
  account: AccountGetAllItemResponseDto;
};
const AccountCard: React.FC<Properties> = ({ account }: Properties) => {
  return (
    <Link
      to={configureString<ValueOf<typeof AppRoute>>(
        AppRoute.ACCOUNTS_DETAILS_$ID,
        {
          id: account.id,
        },
      )}
    >
      <li className={styles['card-wrapper']}>
        <div className={styles['card-name-details']}>
          <Icon className={styles['card-icon']} iconName="coins" />
          <span className={styles['card-title']}>{account.name}</span>
        </div>
        <span className={styles['card-amount-details']}>
          {account.currency} {account.amount}
        </span>
      </li>
    </Link>
  );
};

export { AccountCard };
