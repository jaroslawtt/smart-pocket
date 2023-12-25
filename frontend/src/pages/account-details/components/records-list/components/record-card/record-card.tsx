import { type RecordGetAllItemResponseDto } from '~/packages/records/libs/types/types.js';
import { RecordTypeValue } from '~/packages/records/libs/enums/enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { DropdownMenu, Icon } from '~/libs/components/components.js';
import { useAppDispatch, useCallback, useState } from '~/libs/hooks/hooks.js';
import { useEffect, useRef } from '~/libs/hooks/hooks.js';
import { actions as recordsActions } from '~/slices/records/records.js';
import styles from './styles.module.scss';

type Properties = {
  record: RecordGetAllItemResponseDto;
};

const RecordCard: React.FC<Properties> = ({ record }: Properties) => {
  const [showRecordSettings, setShowRecordSettings] = useState<boolean>(false);
  const handleOpenRecordSettings = useCallback(
    () => void setShowRecordSettings(true),
    [setShowRecordSettings],
  );

  const dropDownReference = useRef<HTMLDivElement>();
  const dispatch = useAppDispatch();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropDownReference.current && event.target) {
        if (!dropDownReference.current?.contains(event.target as Node))
          setShowRecordSettings(false);
      }
    },
    [dropDownReference],
  );

  const handleDeleteClick = useCallback(
    () =>
      void dispatch(
        recordsActions.deleteRecord({
          id: record.id,
        }),
      ),
    [dispatch],
  );

  useEffect(() => {
    if (showRecordSettings)
      window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [showRecordSettings]);

  return (
    <div className={styles['card-wrapper']}>
      <div className={styles['card-content']}>
        <div className={styles['card-details-wrapper']}>
          <div className={styles['card-details']}>
            <span className={styles['card-category-name']}>
              {record.subcategory?.name ?? 'Unknown'}
            </span>
            <span className={styles['card']}>Cash</span>
          </div>
        </div>
        <div className={styles['card-amount-controls']}>
          <div className={styles['card-amount-wrapper']}>
            <span
              className={getValidClassNames(
                record.type === RecordTypeValue.INCOME
                  ? styles['amount-income']
                  : styles['amount-expense'],
              )}
            >
              {record.type === RecordTypeValue.INCOME
                ? `+UAH ${record.amount.toFixed(2)}`
                : `-UAH ${record.amount.toFixed(2)}`}
            </span>
            <div
              className={styles['icon-wrapper']}
              onClick={handleOpenRecordSettings}
            >
              <Icon
                className={styles['record-setting-icon']}
                iconName="ellipsis-vertical"
              />
            </div>
            <DropdownMenu
              className={styles['dropdown-menu']}
              isOpen={showRecordSettings}
              ref={dropDownReference as React.MutableRefObject<HTMLDivElement>}
            >
              <ul className={styles['dropdown-menu-list']}>
                <li className={styles['dropdown-menu-item']}>Edit</li>
                <li
                  className={styles['dropdown-menu-item']}
                  onClick={handleDeleteClick}
                >
                  Delete
                </li>
              </ul>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export { RecordCard };
