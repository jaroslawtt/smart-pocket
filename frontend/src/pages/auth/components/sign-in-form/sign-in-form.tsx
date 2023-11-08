import styles from './styles.module.scss';
import { Button, Input, Link } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
} from '~/packages/users/users.js';
import { DEFAULT_SIGN_IN_PAYLOAD } from '~/pages/auth/components/sign-in-form/libs/constants.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit, handleReset } =
    useAppForm<UserSignInRequestDto>({
      defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
      validationSchema: userSignInValidationSchema,
    });

  const handleFormSubmit = useCallback(
    (_evt: React.FormEvent) => {
      void handleSubmit(onSubmit)(_evt);
    },
    [onSubmit, handleSubmit],
  );

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <div className={styles['auth-form-title-container']}>
        <span className={styles['auth-form-title']}>Sign In</span>
      </div>
      <div className={styles['auth-form-input-container']}>
        <Input
          type="email"
          control={control}
          errors={errors}
          label="Email"
          name="email"
        />
        <Input
          type="password"
          control={control}
          errors={errors}
          label="Password"
          name="password"
        />
        <Button
          type="submit"
          style="primary"
          size="small"
          label="Submit"
          className={styles['submit-button'] as string}
        />
      </div>
      <div className={styles['sign-up-link-wrapper']}>
        Doesn't have an account?&nbsp;
        <Link to={AppRoute.SIGN_UP} className={styles['sign-up-link']}>
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export { SignInForm };
