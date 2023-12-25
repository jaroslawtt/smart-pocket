import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { ErrorMessage, Icon } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';
import { type IconType } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
  name: FieldPath<T>;
  className?: string | undefined;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'date' | 'time';
  icon?: IconType;
  isDisabled?: boolean;
  inputMode?: 'email' | 'text' | 'search';
  isLabelVisuallyHidden?: boolean;
  isTooltipShowedOnlyOnError?: boolean | undefined;
  min?: number | string;
  max?: number | string;
  rows?: number;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  icon,
  isDisabled = false,
  className,
  inputMode = 'text',
  isLabelVisuallyHidden = false,
  isTooltipShowedOnlyOnError = false,
  min,
  max,
  rows,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const shouldShowTooltip = !isTooltipShowedOnlyOnError || hasError;

  const validClassNames = getValidClassNames(
    styles['input'],
    hasError && styles['has-error'],
    icon && styles['search-input'],
    rows && styles['textarea'],
    className,
  );

  return (
    <label className={styles['label']}>
      <span
        className={getValidClassNames(
          styles['input-label'],
          isLabelVisuallyHidden && 'visually-hidden',
        )}
      >
        {label}
      </span>
      {icon && <Icon iconName={icon} className={styles['search-input-icon']} />}
      {rows ? (
        <textarea
          {...field}
          className={validClassNames}
          placeholder={placeholder}
          disabled={isDisabled}
          rows={rows}
        />
      ) : (
        <input
          {...field}
          className={validClassNames}
          type={type}
          placeholder={placeholder}
          disabled={isDisabled}
          inputMode={inputMode}
          min={min}
          max={max}
        />
      )}
      <ErrorMessage error={error as string} />
    </label>
  );
};

export { Input };
