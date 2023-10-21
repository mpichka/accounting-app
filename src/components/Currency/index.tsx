import { CurrencyType } from '@/models/currency';
import { Typography } from 'antd';
import styles from './styles.module.scss';

const { Text } = Typography;

type Props = {
  variant: CurrencyType;
};

function Currency(props: Props) {
  switch (props.variant) {
    case CurrencyType.EUR:
      return (
        <span className={styles.currency}>
          <img src="currency/eur.svg" className={styles.currency_icon} />
          <Text>Євро</Text>
        </span>
      );
    case CurrencyType.USD:
      return (
        <span className={styles.currency}>
          <img src="currency/usd.svg" className={styles.currency_icon} />
          <Text>Долар</Text>
        </span>
      );
    case CurrencyType.UAH:
      return (
        <span className={styles.currency}>
          <img src="currency/uah.svg" className={styles.currency_icon} />
          <Text>Гривня</Text>
        </span>
      );
    default:
      return <></>;
  }
}

export default Currency;
