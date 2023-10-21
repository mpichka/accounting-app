import { setThreadsTotalPrice } from '@/redux/modules/productMaker/actions';
import {
  validateNumberInputKey,
  validateNumberInputStatus,
} from '@/utils/validate_number_input';
import { Input, Typography } from 'antd';
import { ConnectedProps, connect } from 'react-redux';
import styles from '../form.module.scss';
import { getProduct } from '@/redux/modules/productMaker/selectors';

const { Text } = Typography;

type TotalProps = {
  itemsLength: number;
};

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & TotalProps;

function Total(props: Props) {
  return props.itemsLength ? (
    <div className={styles.total}>
      <span className={styles.prefix}>
        <Text>Загальна вартість ниток</Text>
      </span>
      <Input
        size="small"
        defaultValue={props.product.threadsTotalPrice}
        onChange={(e) => props.setThreadsTotalPrice(e.target.value)}
        onKeyDown={validateNumberInputKey}
        status={validateNumberInputStatus(props.product.threadsTotalPrice)}
        style={{ width: '120px' }}
        addonAfter="грн."
      />
    </div>
  ) : null;
}

const mapStateToProps = (store) => ({
  product: getProduct(store),
});

const mapDispatchToProps = (dispatch) => ({
  setThreadsTotalPrice: (payload: string) =>
    dispatch(setThreadsTotalPrice(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Total);
