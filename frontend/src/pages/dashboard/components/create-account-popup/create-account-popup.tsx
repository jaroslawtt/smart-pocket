import styles from './styles.module.scss';
import { Button, Input, Modal, Select } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { type AccountCreateRequestDto } from '~/packages/accounts/libs/types/types.js';
import {
  DEFAULT_CREATE_ACCOUNT_PAYLOAD,
  options,
} from '~/pages/dashboard/components/create-account-popup/libs/constants.js';
import { createAccountValidationSchema } from '~/packages/accounts/accounts.js';

type Properties = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: AccountCreateRequestDto) => void;
  className?: string;
};
const CreateAccountPopup: React.FC<Properties> = ({
  isOpen,
  onClose,
  onSubmit,
}: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<AccountCreateRequestDto>(
    {
      defaultValues: {
        name: DEFAULT_CREATE_ACCOUNT_PAYLOAD.name,
        amount: DEFAULT_CREATE_ACCOUNT_PAYLOAD.amount,
        currency: DEFAULT_CREATE_ACCOUNT_PAYLOAD.currency,
      },
      validationSchema: createAccountValidationSchema,
    },
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent) => {
      return void handleSubmit((payload) => {
        onSubmit(payload);
        return void onClose();
      })(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalTitle="Create account">
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
            />
            <Select
              className={styles['form-select']}
              control={control}
              name="currency"
              options={options}
              label="Currency"
              errors={errors}
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

export { CreateAccountPopup };
