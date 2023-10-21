import Empty from '@/components/Empty';
import { setAccessories } from '@/redux/modules/productMaker/actions';
import { getProductAccessories } from '@/redux/modules/productMaker/selectors';
import { Accessory } from '@/redux/modules/productMaker/type';
import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import styles from '../form.module.scss';
import { ItemForm } from './item';

const { Title } = Typography;

type ProductListProps = {
  products: Accessory[];
  deleteProduct: (index: number) => void;
  handleChange: (index: number, product: Accessory) => void;
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
  const [products, setProducts] = useState<Accessory[]>(props.products);

  const deleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const addProduct = () => {
    setProducts([...products, { amount: '1' }]);
  };

  const handleChange = (index: number, product: Accessory) => {
    setProducts(products.map((item, i) => (i === index ? product : item)));
  };

  useEffect(() => {
    props.setProducts(products);
  }, [products]);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  return (
    <div className={styles.form}>
      <div className={styles.form_header}>
        <Title level={4}>Фурнітура та аксесуари</Title>
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
    </div>
  );
}

const mapStateToProps = (store) => ({
  products: getProductAccessories(store),
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: (payload: Accessory[]) => dispatch(setAccessories(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ProductForm);
