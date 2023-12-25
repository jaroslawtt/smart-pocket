import styles from './styles.module.scss';

type Properties = {
    title: string;
    children: React.ReactNode;
};
const GraphCard: React.FC<Properties> = ({ title, children }: Properties) => {
    return (
        <div className={styles['graph-card-wrapper']}>
            <div className={styles['graph-card-header']}>
                <span className={styles['graph-card-title']}>{ title }</span>
            </div>
            <div className={styles['graph-card-main']}>
                { children }
            </div>
        </div>
    );
};

export { GraphCard };