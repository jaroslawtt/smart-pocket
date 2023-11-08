import styles from './styles.module.scss';
import { SignInForm } from '~/pages/auth/components/sign-in-form/sign-in-form.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useLocation,
} from '~/libs/hooks/hooks.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { SignUpForm } from '~/pages/auth/components/sign-up-form/sign-up-form.js';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { Redirect } from '~/libs/components/components.js';

const Auth = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

  const hasUser = Boolean(user);

  const handleSignUpFormSubmit = useCallback(
    (payload: UserSignUpRequestDto) => {
      void dispatch(authActions.signUp(payload));
    },
    [dispatch],
  );

  const handleSignInFormSubmit = useCallback(
    (payload: UserSignInRequestDto) => {
      void dispatch(authActions.signIn(payload));
    },
    [dispatch],
  );

  const showAuthForm = useCallback(() => {
    switch (pathname) {
      case AppRoute.SIGN_IN:
        return <SignInForm onSubmit={handleSignInFormSubmit} />;
      case AppRoute.SIGN_UP:
        return <SignUpForm onSubmit={handleSignUpFormSubmit} />;
    }
  }, [pathname]);

  if (hasUser) {
    return <Redirect to={AppRoute.ROOT} />;
  }

  return (
    <div className={styles['page-container']}>
      <div className={styles['auth-form-container']}>{showAuthForm()}</div>
    </div>
  );
};

export { Auth };
