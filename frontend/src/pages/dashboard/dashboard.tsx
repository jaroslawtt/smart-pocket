import styles from './styles.module.scss';
import { PageLayout } from '~/libs/components/page-layout/page-layout.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';
import { actions as accountActions } from '~/slices/accounts/accounts.js';
import { actions as recordsActions } from '~/slices/records/records.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { Loader } from '~/libs/components/components.js';
import {
  AccountCard,
  CreateAccountPopup,
  GraphsDetails,
} from '~/pages/dashboard/components/components';
import {
  type AccountCreateRequestDto,
  type AccountUpdateRequestDto,
  type AccountUpdateRequestParamsDto,
} from '~/packages/accounts/libs/types/types.js';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { accounts, status, records } = useAppSelector((state) => ({
    accounts: state.accounts.accounts,
    status: state.accounts.dataStatus,
    records: state.records.records,
  }));

  const isLoading = useCallback(() => status === DataStatus.PENDING, [status]);
  const recordsList = useMemo(() => records, [records]);

  useEffect(
    () =>
      void Promise.allSettled([
        dispatch(accountActions.getUserAccounts()),
        dispatch(recordsActions.getAllRecords()),
      ]),
    [dispatch],
  );

  const handleModalClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const handleModalOpen = useCallback(() => setIsOpen(true), [setIsOpen]);

  const handleCreateAccount = useCallback(
    (payload: AccountCreateRequestDto) => {
      return void dispatch(accountActions.createAccount(payload));
    },
    [dispatch],
  );

  const handleUpdateAccount = useCallback(
    (payload: AccountUpdateRequestDto & AccountUpdateRequestParamsDto) => {
      return void dispatch(
        accountActions.updateAccount({
          payload: {
            name: payload.name,
            amount: payload.amount,
            currency: payload.currency,
          },
          id: payload.id,
        }),
      );
    },
    [dispatch],
  );

  if (isLoading()) return <Loader />;

  return (
    <PageLayout>
      <div className={styles['page-wrapper']}>
        <nav className={styles['accounts-bar']}>
          <ul className={styles['accounts-list']}>
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onAccountUpdate={handleUpdateAccount}
              />
            ))}
            <li
              className={styles['account-create-card']}
              onClick={handleModalOpen}
            >
              + Add account
            </li>
          </ul>
        </nav>
        {recordsList && <GraphsDetails records={recordsList} />}
      </div>
      <CreateAccountPopup
        isOpen={isOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateAccount}
      />
    </PageLayout>
  );
};

export { Dashboard };
