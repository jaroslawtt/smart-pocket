import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';

const Root = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

  useEffect(() => {
    console.log(user);
  }, []);

  return <div>{user && user.username}</div>;
};

export { Root };
