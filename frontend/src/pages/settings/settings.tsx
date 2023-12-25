import { PageLayout } from '~/libs/components/page-layout/page-layout.js';
import styles from './styles.module.scss';
import {
  useAppDispatch,
  useAppSelector,
  useCallback, useLocation,
} from '~/libs/hooks/hooks.js';
import {
  type UserAuthResponse,
  type UserUpdateRequestDto,
} from '~/packages/users/libs/types/types.js';
import { PersonalDetailsEdit } from '~/pages/settings/components/components.js';
import { actions as usersActions } from '~/slices/users/users.js';
import { FormDataKey } from '~/libs/packages/file/file.js';
import {getValidClassNames} from "~/libs/helpers/helpers";
import {AppRoute} from "~/libs/enums/enums";

const Settings = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));

  const handleUserDetailsUpdate = useCallback(
    (payload: UserUpdateRequestDto) =>
      void dispatch(usersActions.updateUserDetails(payload)),
    [dispatch],
  );
  const handleUpdateUserAvatar = useCallback(
      (event: React.MutableRefObject<HTMLInputElement>) => {
        const [avatar] = event.current.files ?? [];

        if (avatar) {
          const formData = new FormData();
          formData.append(FormDataKey.FILE, avatar);

          return void dispatch(usersActions.updateUserProfilePicture(formData));
        }
      },
      [dispatch],
  );

  return (
    <PageLayout>
      <div className={styles['page-wrapper']}>
        <div className={styles['main-content']}>
          <div className={styles['side-bar']}>
            <span className={styles['side-bar-title']}>Settings</span>
            <ul className={styles['side-bar-options-list']}>
              <li className={getValidClassNames(styles['side-bar-option-item'], pathname === AppRoute.SETTINGS ? styles['selected-item'] : '')}>Personal</li>
              <li className={styles['side-bar-option-item']}>Accounts</li>
              <li className={styles['side-bar-option-item']}>Categories</li>
            </ul>
          </div>
          <div className={styles['setting-content']}>
            <PersonalDetailsEdit
              user={user as UserAuthResponse}
              onUpdateDetailsSubmit={handleUserDetailsUpdate}
              onUpdateProfilePic={handleUpdateUserAvatar}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export { Settings };
