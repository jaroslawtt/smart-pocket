import { PageLayout } from '~/libs/components/page-layout/page-layout.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
  useParams,
  useState,
} from '~/libs/hooks/hooks.js';
import {
  actions as accountActions,
  actions as accountsActions,
} from '~/slices/accounts/accounts.js';
import { actions as recordsActions } from '~/slices/records/records.js';
import { actions as appActions } from '~/slices/app/app.js';
import styles from './styles.module.scss';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { Button, Icon, Link, Loader } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  RecordsList,
  StatsGraph,
  UpdateAccountPopup,
} from '~/pages/account-details/components/components.js';
import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import {
  type AccountGetAllItemResponseDto,
  type AccountUpdateRequestDto,
} from '~/packages/accounts/libs/types/types.js';
import { type RecordCreateRequestDto } from '~/packages/records/libs/types/types.js';
import { NotFound } from '~/pages/not-found/not-found';
import { CreateRecordForm } from '~/pages/account-details/components/records-list/components/create-record-form/create-record-form';

const AccountDetails = () => {
  const { id: accountId } = useParams() as { id: string };

  const [showBalanceDetails, setShowBalanceDetails] = useState<boolean>(true);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [showCreateRecordForm, setShowCreateRecordForm] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { account, status, records, accounts } = useAppSelector((state) => ({
    account: state.accounts.currentAccount,
    accounts: state.accounts.accounts,
    status: state.accounts.dataStatus,
    records: state.records.records,
  }));

  const currentAccount = useMemo(() => account, [account]);
  const recordsList = useMemo(() => records, [records]);
  const showBalanceDetailsGraph = useMemo(
    () => showBalanceDetails,
    [showBalanceDetails],
  );

  const handleChooseRecordsOption = useCallback(() => {
    return void setShowBalanceDetails(false);
  }, [setShowBalanceDetails]);

  const handleChooseBalanceGraphOption = useCallback(
    () => void setShowBalanceDetails(true),
    [setShowBalanceDetails],
  );

  const handleCreateRecord = useCallback(
    (payload: RecordCreateRequestDto) =>
      dispatch(recordsActions.createRecord(payload)),
    [dispatch],
  );

  const handleUpdateAccount = useCallback(
    (payload: AccountUpdateRequestDto) => {
      return void dispatch(
        accountActions.updateAccount({
          payload,
          id: accountId,
        }),
      );
    },
    [dispatch],
  );

  const handleShowForm = useCallback(
    () => setShowCreateRecordForm(true),
    [setShowCreateRecordForm],
  );
  const handleCloseForm = useCallback(
    () => setShowCreateRecordForm(false),
    [setShowCreateRecordForm],
  );

  const handleDeleteAccount = useCallback(
    () =>
      void dispatch(accountsActions.deleteAccount(accountId))
        .unwrap()
        .then(() => dispatch(appActions.navigate(AppRoute.ACCOUNTS))),
    [dispatch],
  );

  const handleUpdateFormClose = useCallback(
    () => setShowUpdateForm(false),
    [setShowUpdateForm],
  );
  const handleUpdateFormOpen = useCallback(
    () => setShowUpdateForm(true),
    [setShowUpdateForm],
  );

  useEffect(() => {
    dispatch(
      accountsActions.getAccountById({
        id: accountId,
      }),
    );
  }, []);

  useEffect(() => {
    if (showBalanceDetailsGraph)
      dispatch(recordsActions.getAccountRecords({ accountId }));
  }, [showBalanceDetailsGraph]);

  if (!account && status === DataStatus.FULFILLED) return <NotFound />;

  if (status === DataStatus.PENDING) return <Loader />;

  return (
    <PageLayout>
      <div className={styles['page-wrapper']}>
        <div className={styles['control-panel']}>
          <div className={styles['panel-header']}>
            <div className={styles['header-left-block']}>
              <Link
                className={styles['back-icon-wrapper']}
                to={AppRoute.ACCOUNTS}
              >
                <Icon className={styles['back-icon']} iconName="arrow-left" />
              </Link>
              <span>Account details</span>
            </div>
            <div className={styles['header-controls']}>
              <Button
                className={styles['header-control-btn']}
                label="Edit"
                onClick={handleUpdateFormOpen}
              />
              <Button
                className={getValidClassNames(
                  styles['header-control-btn'],
                  styles['delete-btn'],
                )}
                label="Delete"
                onClick={handleDeleteAccount}
              />
            </div>
          </div>
          <div className={styles['panel-main']}>
            <div className={styles['main-content']}>
              <div className={styles['main-content-wrapper']}>
                <div className={styles['main-icon-wrapper']}>
                  <Icon className={styles['main-icon']} iconName="coins" />
                </div>
              </div>
              <div className={styles['content-data']}>
                <span className={styles['content-data-subtitle']}>Name</span>
                <span className={styles['content-data-title']}>
                  {currentAccount && currentAccount.name}
                </span>
              </div>
            </div>
          </div>
          <div className={styles['panel-footer']}>
            <ul className={styles['footer-content-list']}>
              <li
                className={getValidClassNames(
                  styles['content-item'],
                  showBalanceDetails ? styles['selected-option'] : '',
                )}
                onClick={handleChooseBalanceGraphOption}
              >
                Balance
              </li>
              <li
                className={getValidClassNames(
                  styles['content-item'],
                  !showBalanceDetails ? styles['selected-option'] : '',
                )}
                onClick={handleChooseRecordsOption}
              >
                Records
              </li>
            </ul>
          </div>
        </div>
        <div className={styles['records-list-wrapper']}>
          {showBalanceDetails && account
            ? recordsList && <StatsGraph records={recordsList} />
            : recordsList && (
                <>
                  {Array.from(
                    recordsList
                      .reduce((accumulator, record) => {
                        const date = new Date(record.date).toLocaleDateString(
                          undefined,
                          { month: 'long', day: '2-digit' },
                        );

                        if (accumulator.has(date)) {
                          const recordsList = accumulator.get(
                            date,
                          ) as RecordGetAllItemResponseDto[];
                          recordsList.push(record);
                        } else {
                          const recordsList = [record];
                          accumulator.set(date, recordsList);
                        }
                        return accumulator;
                      }, new Map<string, RecordGetAllItemResponseDto[]>())
                      .entries(),
                  )
                    .sort(([date1], [date2]) => {
                      return (
                        new Date(date1).getTime() - new Date(date2).getTime()
                      );
                    })
                    .reverse()
                    .map(([date, sortedList], index) => (
                      <RecordsList
                        key={index}
                        date={date}
                        records={sortedList}
                      />
                    ))}
                  {account && (
                    <>
                      <Button
                        className={styles['crate-item-btn']}
                        onClick={handleShowForm}
                        label="+ Add"
                      />
                      <CreateRecordForm
                        isOpen={showCreateRecordForm}
                        onClose={handleCloseForm}
                        onSubmit={handleCreateRecord}
                        currentAccount={account}
                        accounts={accounts}
                      />
                    </>
                  )}
                </>
              )}
        </div>
      </div>
      {account && (
        <UpdateAccountPopup
          account={account}
          isOpen={showUpdateForm}
          onClose={handleUpdateFormClose}
          onSubmit={handleUpdateAccount}
        />
      )}
    </PageLayout>
  );
};

export { AccountDetails };
