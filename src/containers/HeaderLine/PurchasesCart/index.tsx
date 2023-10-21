import { ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { useState } from 'react';
import styles from '../styles.module.scss';

function PurchasesCart() {
  const [count, setCount] = useState(5);

  return (
    <a href="#">
      <Badge count={count} style={{ userSelect: 'none' }}>
        <Avatar
          shape="square"
          size="large"
          icon={<ShoppingCartOutlined />}
          className={styles.purchases_cart}
        />
      </Badge>
    </a>
  );
}

export default PurchasesCart;
