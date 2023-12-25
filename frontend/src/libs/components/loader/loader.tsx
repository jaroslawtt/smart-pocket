import styles from './styles.module.scss';
const Loader = () => {
  return (
    <div className={styles['content-wrapper']}>
      <div className={styles['loader']}></div>
    </div>
  );
};

export { Loader };
