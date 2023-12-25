import { Control, FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import { SelectOption } from '~/libs/types/select-option.type.js';
import styles from './styles.module.scss';
import ReactSelect from 'react-select';
import {
  useCallback,
  useFormController,
  useState,
} from '~/libs/hooks/hooks.js';
import { getValidClassNames } from '~/libs/helpers/helpers';
import { ErrorMessage } from '~/libs/components/components';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  options: SelectOption<string | number>[];
  placeholder?: string;
  label: string;
  errors: FieldErrors<T>;
  className?: string | undefined;
  onUpdate?: () => void;
  isDisabled?: boolean;
};

const Select = <T extends FieldValues>({
  name,
  control,
  options,
  className,
  onUpdate,
  isDisabled,
  label,
  errors,
}: Properties<T>) => {
  const { field } = useFormController({ name, control });

  const [{ isMenuOpen, isOptionSelected }, setMenuState] = useState<{
    isMenuOpen: boolean;
    isOptionSelected: boolean;
  }>({
    isMenuOpen: false,
    isOptionSelected: !!field.value,
  });

  const handleMenuOpenToggle = useCallback(
    () =>
      setMenuState((state) => ({ ...state, isMenuOpen: !state.isMenuOpen })),
    [setMenuState],
  );
  const handleChooseMenuOption = useCallback(
    () => setMenuState((state) => ({ ...state, isOptionSelected: true })),
    [setMenuState],
  );

  const handleSelectValue = (
    value: string | number | (string | number)[],
  ): SelectOption<string | number> | undefined => {
    return options.find((c) => c.value === value);
  };

  const error = errors[name]?.message;

  const handleChange = useCallback(
    (updatedOption: unknown): void => {
      const updatedValue = (updatedOption as SelectOption<string | number>)
        .value;

      field.onChange(updatedValue);
      handleChooseMenuOption();

      if (onUpdate) onUpdate();
    },
    [field, options, handleChooseMenuOption],
  );

  return (
    <label className={getValidClassNames(styles['label'], className)}>
      {label}
      <ReactSelect
        defaultValue={handleSelectValue(field.value)}
        value={handleSelectValue(field.value)}
        onChange={handleChange}
        options={options}
        name={name}
        onMenuOpen={handleMenuOpenToggle}
        onMenuClose={handleMenuOpenToggle}
        classNamePrefix="react-select"
        isDisabled={isDisabled}
      />
      <ErrorMessage error={error as string} />
    </label>
  );
};

export { Select };
