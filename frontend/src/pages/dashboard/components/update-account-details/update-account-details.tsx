import styles from './styles.module.scss';
import { Button, Input, Modal, Select } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type AccountUpdateRequestDto,
  type AccountGetAllItemResponseDto,
  type AccountUpdateRequestParamsDto,
} from '~/packages/accounts/libs/types/types.js';
import { updateAccountValidationSchema } from '~/packages/accounts/libs/validation-schemas/validation-schemas.js';
import { options } from './libs/constants.js';

type Properties = {
  account: AccountGetAllItemResponseDto;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    payload: AccountUpdateRequestDto & AccountUpdateRequestParamsDto,
  ) => void;
  className?: string;
};
const UpdateAccountPopup: React.FC<Properties> = ({
  isOpen,
  onClose,
  onSubmit,
  account,
}: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<AccountUpdateRequestDto>(
    {
      defaultValues: {
        name: account.name,
        amount: account.amount,
        currency: account.currency,
      },
      validationSchema: updateAccountValidationSchema,
    },
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent) => {
      return void handleSubmit((payload) => {
        onSubmit({
          ...payload,
          id: account.id,
        });
        return void onClose();
      })(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalTitle="Update account">
      <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
        <Input
          className={styles['form-input']}
          control={control}
          errors={errors}
          label="Name"
          name="name"
        />
        <div>
          <div className={styles['form-amount-details']}>
            <Input
              type="number"
              className={styles['form-input']}
              control={control}
              errors={errors}
              label="Amount"
              name="amount"
              isDisabled={true}
            />
            <Select
              className={styles['form-select']}
              control={control}
              name="currency"
              options={options}
              label="Currency"
              errors={errors}
              isDisabled={true}
            />
          </div>
        </div>
        <Button
          type="submit"
          className={styles['form-submit-btn']}
          label="Save"
        />
      </form>
    </Modal>
  );
};

export { UpdateAccountPopup };
