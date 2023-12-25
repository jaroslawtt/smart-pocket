import { PageLayout } from "~/libs/components/page-layout/page-layout.js";
import styles from './styles.module.scss';
import { Select } from "~/libs/components/select/select.js";
import { options } from "~/pages/accounts/libs/constants.js";

const Records = () => {
    return (
        <PageLayout>
            <div className={styles['page-wrapper']}>
                <div className={styles['controls-bar']}>

                </div>
            </div>
        </PageLayout>
    );
};

export { Records };