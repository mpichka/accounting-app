import Empty from '@/components/Empty';
// import { defaultProduct } from '@/redux/modules/productMaker/default_product';
import {
  setThreads,
  setThreadsTotalPrice,
} from '@/redux/modules/productMaker/actions';
import { getProductThreads } from '@/redux/modules/productMaker/selectors';
import { Thread } from '@/redux/modules/productMaker/type';
import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import styles from '../form.module.scss';
import { ItemForm } from './item';
import Total from './total';

const { Title } = Typography;

type ProductListProps = {
  products: Thread[];
  deleteProduct: (index: number) => void;
  handleChange: (index: number, product: Thread) => void;
};

function ProductList(props: ProductListProps) {
  return props.products.length ? (
    <div className={styles.list}>
      <ul>
        {props.products.map((product, index) => (
          <li key={index}>
            <ItemForm
              index={index}
              onDelete={props.deleteProduct}
              data={product}
              onChange={props.handleChange}
            />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Empty />
  );
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ProductForm(props: Props) {
  const [products, setProducts] = useState<Thread[]>(props.products);

  const deleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const addProduct = () => {
    setProducts([...products, { length: '1' }]);
  };

  const handleChange = (index: number, product: Thread) => {
    setProducts(products.map((item, i) => (i === index ? product : item)));
  };

  useEffect(() => {
    props.setProducts(products);
    if (!products.length) props.setThreadsTotalPrice('');
  }, [products]);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  return (
    <div className={styles.form}>
      <div className={styles.form_header}>
        <Title level={4}>Нитки</Title>
        <Button
          className={styles.add_button_top}
          type="primary"
          size="small"
          onClick={addProduct}
        >
          Додати
        </Button>
      </div>
      <ProductList
        products={products}
        deleteProduct={deleteProduct}
        handleChange={handleChange}
      />
      <Total itemsLength={products.length} />
    </div>
  );
}

const mapStateToProps = (store) => ({
  products: getProductThreads(store),
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: (payload: Thread[]) => dispatch(setThreads(payload)),
  setThreadsTotalPrice: (payload: string) =>
    dispatch(setThreadsTotalPrice(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ProductForm);
