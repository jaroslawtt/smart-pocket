import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { actions as appActions } from '~/slices/app/app.js';
import { RouterOutlet } from '~/libs/components/components';
import { DataStatus } from '~/libs/enums/enums';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, user, navigateTo } = useAppSelector((state) => ({
    user: state.auth.user,
    status: state.auth.dataStatus,
    navigateTo: state.app.navigateTo,
  }));

  const hasUser = Boolean(user);

  useEffect(() => {
    if (navigateTo) {
      navigate(navigateTo);

      dispatch(appActions.navigate(null));
    }
  }, [navigateTo, hasUser, dispatch]);

  useEffect(() => {
    if (!hasUser) {
      void dispatch(authActions.getCurrentUser());
    }
  }, [hasUser, dispatch]);

  const isLoading = status === DataStatus.PENDING;

  if (isLoading) return <div>Loading</div>;

  return <RouterOutlet />;
};

export { App };
