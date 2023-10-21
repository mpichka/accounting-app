import { ShoppingOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { useState } from 'react';
import styles from '../styles.module.scss';

function OrdersCart() {
  const [count, setCount] = useState(42);

  return (
    <a href="#">
      <Badge count={count} style={{ userSelect: 'none' }}>
        <Avatar
          shape="square"
          size="large"
          icon={<ShoppingOutlined />}
          className={styles.orders_cart}
        />
      </Badge>
    </a>
  );
}

export default OrdersCart;
