import styles from './styles.module.scss';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type UserSignUpRequestDto,
  userSignUpValidationSchema,
} from '~/packages/users/users.js';
import { DEFAULT_SIGN_UP_PAYLOAD } from '~/pages/auth/components/sign-up-form/libs/constants.js';
import { Button, Input, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};
const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit, handleReset } =
    useAppForm<UserSignUpRequestDto>({
      defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
      validationSchema: userSignUpValidationSchema,
    });

  const handleFormSubmit = useCallback(
    (_evt: React.BaseSyntheticEvent) => {
      void handleSubmit(onSubmit)(_evt);
    },
    [onSubmit, handleSubmit],
  );

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <div className={styles['auth-form-title-container']}>
        <span className={styles['auth-form-title']}>Sign Up</span>
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
          control={control}
          errors={errors}
          label="Username"
          name="username"
        />
        <Input
          control={control}
          errors={errors}
          label="First name"
          name="firstName"
        />
        <Input
          control={control}
          errors={errors}
          label="Last name"
          name="lastName"
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
          label="Submit"
          className={styles['submit-button']}
        />
      </div>
      <div className={styles['sign-in-link-wrapper']}>
        Already have an account?&nbsp;
        <Link to={AppRoute.SIGN_IN} className={styles['sign-in-link']}>
          Sign In
        </Link>
      </div>
    </form>
  );
};

export { SignUpForm };
