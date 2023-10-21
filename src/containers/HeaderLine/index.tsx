import {
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import dayjs from 'dayjs';
import CurrencyRatesDisplay from '../CurrencyRatesDisplay';
import OrdersCart from './OrdersCart';
import PurchasesCart from './PurchasesCart';
import styles from './styles.module.scss';

type Props = {
  navCollapsed: boolean;
  setCollapsed: (state: boolean) => void;
};

function HeaderLine(props: Props) {
  return (
    <Header className={styles.header}>
      <Button
        type="text"
        icon={
          props.navCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
        }
        onClick={() => props.setCollapsed(!props.navCollapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <span className={styles.utils}>
        <CurrencyRatesDisplay />
        <Button>
          {dayjs().format('DD-MM-YYYY')}
          <CalendarOutlined />
        </Button>
      </span>
      <span className={styles.badges}>
        {/* <OrdersCart /> */}
        <PurchasesCart />
      </span>
    </Header>
  );
}

export default HeaderLine;
