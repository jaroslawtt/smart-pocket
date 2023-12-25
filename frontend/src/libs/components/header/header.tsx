import logo from '~/assets/img/logo.svg';
import profile from '~/assets/img/profile-pic.jpg';

import { type UserAuthResponse } from '~/packages/users/libs/types/types.js';
import styles from './styles.module.scss';
import {
  Link,
  Image,
  Icon,
  DropdownMenu,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { actions as appActions } from '~/slices/app/app';

type Properties = {
  user: UserAuthResponse;
};
const Header: React.FC<Properties> = ({ user }) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
  const dropDownReference = useRef<HTMLDivElement>();

  const dispatch = useAppDispatch();

  const handleLogOut = useCallback(
    () => void dispatch(authActions.signOut()),
    [dispatch],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropDownReference.current && event.target) {
        if (!dropDownReference.current?.contains(event.target as Node))
          setShowDropdownMenu(false);
      }
    },
    [dropDownReference],
  );

  const handleRedirect = useCallback(
    () => void dispatch(appActions.navigate(AppRoute.SETTINGS)),
    [dispatch],
  );

  useEffect(() => {
    if (showDropdownMenu)
      window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdownMenu]);

  const handleOpenModal = useCallback(
    () => void setShowDropdownMenu(true),
    [setShowDropdownMenu],
  );

  return (
    <header className={styles['header']}>
      <div className={styles['section-controls']}>
        <Link to={AppRoute.DASHBOARD}>
          {' '}
          <Image className={styles['logo-image']} src={logo} alt="wallet" />
        </Link>
        <ul className={styles['section-list']}>
          <li className={styles['section-item']}>
            <Link to={AppRoute.DASHBOARD}>Dashboard</Link>
          </li>
          <li className={styles['section-item']}>
            <Link to={AppRoute.ACCOUNTS}>Accounts</Link>
          </li>
          <li className={styles['section-item']}>
            <Link to={AppRoute.RECORDS}>Records</Link>
          </li>
        </ul>
      </div>
      <div className={styles['profile-controls']}>
        <div className={styles['profile-data-wrapper']}>
          <Image
            className={styles['profile-image']}
            src={user.avatarUrl ?? profile}
            alt="profile-pic"
          />
          <span className={styles['profile-caption']}>
            {user.firstName} {user.lastName}
          </span>
          <Icon
            className={styles['dropdown-menu-icon']}
            iconName="dropdown"
            onClick={handleOpenModal}
          />
          <DropdownMenu
            isOpen={showDropdownMenu}
            ref={dropDownReference as React.MutableRefObject<HTMLDivElement>}
            className={styles['dropdown-menu']}
          >
            <ul className={styles['dropdown-menu-list']}>
              <li
                className={styles['dropdown-menu-item']}
                onClick={handleRedirect}
              >
                Settings
              </li>
              <li
                className={styles['dropdown-menu-item']}
                onClick={handleLogOut}
              >
                Sign Out
              </li>
            </ul>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export { Header };
