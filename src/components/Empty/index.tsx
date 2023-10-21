import { Empty as EmptyPlaceholder } from 'antd';
import styles from './styles.module.scss';

export default function Empty() {
  return (
    <EmptyPlaceholder
      className={styles.empty}
      description="Пусто"
      image={EmptyPlaceholder.PRESENTED_IMAGE_SIMPLE}
    />
  );
}
