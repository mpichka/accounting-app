import Empty from '@/components/Empty';
import { setPackages } from '@/redux/modules/productMaker/actions';
import { getProductPackages } from '@/redux/modules/productMaker/selectors';
import { Package } from '@/redux/modules/productMaker/type';
import { Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import styles from '../form.module.scss';
import { ItemForm } from './item';

const { Title } = Typography;

type ProductListProps = {
  products: Package[];
  deleteProduct: (index: number) => void;
  handleChange: (index: number, product: Package) => void;
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
  const [products, setProducts] = useState<Package[]>(props.products);

  const deleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const addProduct = () => {
    setProducts([...products, {}]);
  };

  const handleChange = (index: number, product: Package) => {
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
        <Title level={4}>Пакування</Title>
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
  products: getProductPackages(store),
});

const mapDispatchToProps = (dispatch) => ({
  setProducts: (payload: Package[]) => dispatch(setPackages(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ProductForm);
