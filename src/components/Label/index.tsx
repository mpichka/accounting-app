import { Typography } from 'antd';
import styles from './styles.module.scss';
const { Text } = Typography;

type Props = React.PropsWithChildren & {
  name: string;
};

export function Label(props: Props) {
  return (
    <div className={styles.label_wrapper}>
      <label>
        <Text className={styles.label_text}>{props.name}</Text>
        <br />
        {props.children}
      </label>
    </div>
  );
}
