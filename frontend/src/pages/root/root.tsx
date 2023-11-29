import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as accountsActions } from '~/slices/accounts/accounts.js';
import { AccountCard } from '~/pages/root/components/components';
import styles from './styles.module.scss';

const Root = () => {
  const dispatch = useAppDispatch();

  const { accounts } = useAppSelector((state) => ({
    user: state.auth.user,
    accounts: state.accounts.accounts,
  }));

  useEffect(() => {
    dispatch(accountsActions.getUserAccounts());
  }, []);

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['accounts-controls-wrapper']}>Accounts</div>
      <div className={styles['accounts-wrapper']}>
        {accounts.map((account) => (
          <AccountCard account={account} key={account.id} />
        ))}
      </div>
    </div>
  );
};

export { Root };
