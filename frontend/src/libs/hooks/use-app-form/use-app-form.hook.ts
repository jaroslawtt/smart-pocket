import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DeepPartial,
  type FieldErrors,
  type FieldValues, FormState,
  type Mode,
  type UseFormGetValues,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormReset, UseFormSetValue,
} from 'react-hook-form';
import { useForm  } from 'react-hook-form';

import { type ValidationSchema } from '~/libs/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DeepPartial<T>;
  validationSchema?: ValidationSchema;
  mode?: Mode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  handleReset: UseFormReset<T>;
  handleValuesGet: UseFormGetValues<T>;
  formState: FormState<T>;
  setValue: UseFormSetValue<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  validationSchema,
  defaultValues,
  mode = 'onSubmit',
}: Parameters<T>): ReturnValue<T> => {
  let parameters: UseFormProps<T> = {
    mode,
    defaultValues,
  };

  if (validationSchema) {
    parameters = {
      ...parameters,
      resolver: joiResolver(validationSchema),
    };
  }
  const {
    control,
    handleSubmit,
    formState,
    reset: handleReset,
    getValues: handleValuesGet,
    setValue,
  } = useForm<T>(parameters);

  return {
    control,
    errors: formState.errors,
    handleSubmit,
    handleReset,
    handleValuesGet,
    formState,
    setValue,
  };
};

export { useAppForm };
