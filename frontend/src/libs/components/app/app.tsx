import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useNavigate,
  useMemo,
} from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { actions as appActions } from '~/slices/app/app.js';
import { Loader, RouterOutlet } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { status, user, navigateTo } = useAppSelector((state) => ({
    user: state.auth.user,
    status: state.auth.dataStatus,
    navigateTo: state.app.navigateTo,
  }));
  const hasUser = useMemo(() => Boolean(user), [user]);

  useMemo(() => {
    if (!hasUser && status === DataStatus.IDLE)
      return void dispatch(authActions.getCurrentUser());
    else if (hasUser && pathname === AppRoute.ROOT)
      return void dispatch(appActions.navigate(AppRoute.DASHBOARD));
  }, [hasUser, pathname]);

  useEffect(() => {
    if (navigateTo) {
      navigate(navigateTo);

      return void dispatch(appActions.navigate(null));
    }
  }, [navigateTo]);

  const isLoading = status === DataStatus.PENDING;

  if (isLoading) return <Loader />;

  return <RouterOutlet />;
};

export { App };
