import { saveProduct } from '@/redux/modules/productMaker/actions';
import { getProduct } from '@/redux/modules/productMaker/selectors';
import { Button, Divider, Typography } from 'antd';
import { ConnectedProps, connect } from 'react-redux';
import Accessories_summary from './accessories_summary';
import BeadsSummary from './beads_summary';
import Packages_summary from './packages_summary';
import styles from './styles.module.scss';
import Threads_summary from './threads_summary';
import Total_summary from './total_summary';

const { Title } = Typography;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ProductPreview(props: Props) {
  return (
    <div>
      <Title level={3}>{props.product.name || 'Новий виріб'}</Title>
      <BeadsSummary />
      <Accessories_summary />
      <Threads_summary />
      <Packages_summary />
      <Divider />
      <Total_summary />
      <Button
        className={styles.save_product_button}
        type="primary"
        size="large"
        onClick={() => props.saveProduct()}
      >
        {props.product.id ? 'Оновити виріб' : 'Додати виріб'}
      </Button>
      {props.product.id ? (
        <>
          <Button className={styles.update_product_button}>
            Додати як новий виріб
          </Button>
          <Button className={styles.delete_product_button} danger>
            Видалити
          </Button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  product: getProduct(store),
});

const mapDispatchToProps = (dispatch) => ({
  saveProduct: () => dispatch(saveProduct()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ProductPreview);
