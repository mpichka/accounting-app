import {
  setBeadsQuality,
  setBeadsTotalWeight,
} from '@/redux/modules/productMaker/actions';
import { BeadsQuality } from '@/redux/modules/productMaker/type';
import {
  validateNumberInputKey,
  validateNumberInputStatus,
} from '@/utils/validate_number_input';
import { Input, Select, Typography } from 'antd';
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
        <Text>Якість бісеру</Text>
      </span>
      <Select
        style={{ width: 120, marginRight: '8px' }}
        onChange={(value) => props.setBeadsQuality(value)}
        size="small"
        options={[
          { value: BeadsQuality.high, label: 'висока' },
          { value: BeadsQuality.medium, label: 'середня' },
          { value: BeadsQuality.low, label: 'низька' },
        ]}
        defaultValue={props.product.beadsQuality}
      />
      <span className={styles.prefix}>
        <Text>Загальна вага бісеру</Text>
      </span>
      <Input
        size="small"
        defaultValue={props.product.beadsTotalWeight}
        onChange={(e) => props.setBeadsTotalWeight(e.target.value)}
        onKeyDown={validateNumberInputKey}
        status={validateNumberInputStatus(props.product.beadsTotalWeight)}
        style={{ width: '120px' }}
        addonAfter="грам"
      />
    </div>
  ) : null;
}

const mapStateToProps = (store) => ({
  product: getProduct(store),
});

const mapDispatchToProps = (dispatch) => ({
  setBeadsQuality: (payload: string) => dispatch(setBeadsQuality(payload)),
  setBeadsTotalWeight: (payload: string) =>
    dispatch(setBeadsTotalWeight(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Total);
