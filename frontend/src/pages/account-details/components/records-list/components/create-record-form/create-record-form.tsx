import styles from './styles.module.scss';
import { Button, Input, Modal, Select } from '~/libs/components/components.js';
import { type RecordCreateRequestDto } from '~/packages/records/libs/types/types.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
  useWatch,
} from '~/libs/hooks/hooks.js';
import { type AccountGetAllItemResponseDto } from '~/packages/accounts/libs/types/types.js';
import {
  DEFAULT_CREATE_RECORD_PAYLOAD,
  RECORD_TYPE_OPTIONS,
} from '~/pages/account-details/components/records-list/components/create-record-form/libs/constants';
import { accountsToReadableMap } from '~/pages/account-details/components/records-list/components/create-record-form/libs/accounts-to-readable-map.js';
import { RecordTypeValue } from '~/packages/records/libs/enums/enum.js';
import { actions as categoriesActions } from '~/slices/categories/categories.js';
import { categoriesToReadableMap } from '~/pages/account-details/components/records-list/components/create-record-form/libs/categories-to-readable-map';
import { categoriesToSubcategoriesList } from '~/pages/account-details/components/records-list/components/create-record-form/libs/categories-to-subcategories-list';
import { subcategoriesToReadableMap } from '~/pages/account-details/components/records-list/components/create-record-form/libs/subcategories-to-readable-map';
import { type SubcategoryGetAllItemResponseDto } from '~/packages/subcategories/libs/types/types.js';
import { SelectOption } from '~/libs/types/select-option.type';
import { createRecordValidationSchema } from '~/packages/records/libs/validation-schemas/validation-schemas.js';

type Properties = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: RecordCreateRequestDto) => void;
  currentAccount: AccountGetAllItemResponseDto;
  accounts: AccountGetAllItemResponseDto[];
};
const CreateRecordForm: React.FC<Properties> = ({
  isOpen,
  onClose,
  onSubmit,
  currentAccount,
  accounts,
}: Properties) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => ({
    categories: state.categories.categories,
  }));

  const categoriesList = useMemo(() => categories, [categories]);

  useEffect(() => void dispatch(categoriesActions.getAllUserCategories()), []);

  const { control, errors, handleSubmit  } = useAppForm<RecordCreateRequestDto>({
    defaultValues: {
      type: DEFAULT_CREATE_RECORD_PAYLOAD.type,
      accountId: currentAccount.id,
      amount: DEFAULT_CREATE_RECORD_PAYLOAD.amount,
    },
    validationSchema: createRecordValidationSchema,
  });

  const selectedRecordType = useWatch({
    name: 'type',
    control,
    defaultValue: DEFAULT_CREATE_RECORD_PAYLOAD.type,
  });

  const selectedCategory = useWatch({
    name: 'categoryId',
    control,
  });

  const isSelectedCategory = useMemo(
    () => !!selectedCategory,
    [selectedCategory],
  );

  const ACCOUNTS_OPTIONS = Object.entries(
    accountsToReadableMap(
      accounts.filter((account) => account.id !== currentAccount.id),
    ),
  ).map(([id, name]) => ({
    label: name,
    value: id,
  }));

  const CATEGORIES_OPTIONS = useMemo(
    () =>
      Object.entries(categoriesToReadableMap(categoriesList ?? [])).map(
        ([key, value]) => ({
          label: key,
          value: value,
        }),
      ),
    [categoriesList],
  );

  const SUBCATEGORIES_OPTIONS = useMemo(() => {
    if (selectedCategory && isSelectedCategory) {
      const categoriesToSubcategories = categoriesToSubcategoriesList(
        categories ?? [],
      );

      const subcategories = categoriesToSubcategories.get(
        selectedCategory,
      ) as SubcategoryGetAllItemResponseDto[];

      return Object.entries(
        subcategoriesToReadableMap(subcategories ?? []),
      ).map(([key, value]) => ({
        label: key,
        value,
      }));
    }
  }, [isSelectedCategory]);

  const handleFormSubmit = useCallback((event_: React.BaseSyntheticEvent) => {
    void handleSubmit((payload) => {
      onSubmit(payload)
    })(event_);
    onClose();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalTitle="Create record">
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <div className={styles['form-data-wrapper']}>
          <div className={styles['form-data-sides-wrapper']}>
            <div className={styles['form-data']}>
              <div className={styles['form-data-top']}>
                <Select
                  control={control}
                  name="type"
                  options={RECORD_TYPE_OPTIONS}
                  label="Type"
                  errors={errors}
                />
                {selectedRecordType === RecordTypeValue.TRANSFER && (
                  <Select
                    name="toAccountId"
                    errors={errors}
                    control={control}
                    label="To account"
                    options={ACCOUNTS_OPTIONS}
                  />
                )}
                <div className={styles['input-amount']}>
                  <Input
                    control={control}
                    errors={errors}
                    label="Amount"
                    name="amount"
                  />
                </div>
              </div>
              <div className={styles['form-data-bottom']}>
                {selectedRecordType !== RecordTypeValue.TRANSFER && (
                  <Select
                    control={control}
                    name="categoryId"
                    options={
                      isSelectedCategory
                        ? (SUBCATEGORIES_OPTIONS as SelectOption<number>[]) ??
                          []
                        : CATEGORIES_OPTIONS
                    }
                    label="Category"
                    errors={errors}
                  />
                )}
              </div>
            </div>
            <Button type='submit' label='+ Add record' className={styles['submit-btn']} />
          </div>

          <div className={styles['form-details']}>
            <Input
              control={control}
              errors={errors}
              label="Payee"
              name="payee"
            />
            <Input
              control={control}
              errors={errors}
              label="Place"
              name="place"
            />
            <Input
              rows={5}
              control={control}
              errors={errors}
              label="Note"
              name="description"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export { CreateRecordForm };
