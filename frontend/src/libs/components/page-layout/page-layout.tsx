import { useAppSelector } from '~/libs/hooks/hooks.js';
import styles from './styles.module.scss';
import { Footer, Header } from '~/libs/components/components.js';

type Properties = {
  children: React.ReactNode;
};

const PageLayout: React.FC<Properties> = ({ children }) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  return (
    <div className={styles['page-layout-wrapper']}>
      <div className={styles['header-wrapper']}>
        {user && <Header user={user} />}
      </div>
      <div className={styles['page-content-wrapper']}>{children}</div>
    </div>
  );
};

export { PageLayout };
