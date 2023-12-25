import { PageLayout } from '~/libs/components/page-layout/page-layout.js';
import styles from './styles.module.scss';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';
import {
  type AccountCreateRequestDto,
  type AccountFilterQueryDto,
} from '~/packages/accounts/accounts.js';
import {
  Button,
  Icon,
  Input,
  Select,
} from '~/libs/components/components.js';
import { AccountSortValue } from '~/packages/accounts/libs/enums/enums.js';
import { options } from '~/pages/accounts/libs/constants.js';
import { actions as accountActions } from '~/slices/accounts/accounts.js';
import {
  AccountCard,
  CreateAccountPopup,
} from '~/pages/accounts/components/components.js';
import { initDebounce } from '~/libs/helpers/helpers.js';

const Accounts = () => {
  const dispatch = useAppDispatch();
  const [showCreateAccountForm, setShowCreateAccountForm] =
    useState<boolean>(false);

  const { control, errors, handleSubmit, handleValuesGet } =
    useAppForm<AccountFilterQueryDto>({
      defaultValues: {
        name: '',
        sort: AccountSortValue.NAME_ASC,
      },
    });

  const { accounts, status } = useAppSelector((state) => ({
    accounts: state.accounts.accounts,
    status: state.accounts.dataStatus,
  }));

  const handleSearch = useCallback(
    (payload: AccountFilterQueryDto) => {
      void dispatch(
        accountActions.getUserAccounts({
          name: payload.name,
          sort: payload.sort,
        }),
      );
    },
    [dispatch],
  );

  const handleCreateAccount = useCallback(
    (payload: AccountCreateRequestDto) =>
      void dispatch(accountActions.createAccount(payload)),
    [dispatch],
  );

  const handleShowCreateAccountForm = useCallback(
    () => void setShowCreateAccountForm(true),
    [setShowCreateAccountForm],
  );
  const handleHideCreateAccountForm = useCallback(
    () => void setShowCreateAccountForm(false),
    [setShowCreateAccountForm],
  );

  const handleFormChange = initDebounce((event_: React.BaseSyntheticEvent) => {
    void handleSubmit(handleSearch)(event_);
  });

  const handleSelectValueUpdate = useCallback(() => {
    const payload = handleValuesGet();

    handleSearch(payload);
  }, [handleValuesGet]);

  const accountList = useMemo(() => accounts, [accounts]);

  useEffect(() => {
    return void dispatch(accountActions.getUserAccounts());
  }, [dispatch]);

  return (
    <PageLayout>
      <div className={styles['page-wrapper']}>
        <form className={styles['form']} onChange={handleFormChange}>
          <div className={styles['controls-bar']}>
            <label className={styles['controls-bar-label']}>
              Sort by
              <Select
                className={styles['select-item']}
                control={control}
                name="sort"
                options={options}
                label=""
                errors={errors}
                onUpdate={handleSelectValueUpdate}
              />
            </label>
          </div>
          <div className={styles['main-content']}>
            <div className={styles['side-bar']}>
              <div className={styles['side-bar-controls']}>
                <span className={styles['side-bar-title']}>Accounts</span>
                <Button
                  className={styles['add-button']}
                  label="+ Add"
                  onClick={handleShowCreateAccountForm}
                />
              </div>
              <div className={styles['page-control']}>
                <label className={styles['search-bar-wrapper']}>
                  <Icon
                    className={styles['search-input-icon']}
                    iconName="magnifying-glass"
                  />
                  <Input
                    className={styles['search-input']}
                    placeholder="Search"
                    control={control}
                    errors={errors}
                    label=""
                    name="name"
                  />
                </label>
              </div>
            </div>
            <ul className={styles['main-list']}>
              {accountList.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </ul>
          </div>
        </form>
      </div>
      <CreateAccountPopup
        isOpen={showCreateAccountForm}
        onClose={handleHideCreateAccountForm}
        onSubmit={handleCreateAccount}
      />
    </PageLayout>
  );
};

export { Accounts };
