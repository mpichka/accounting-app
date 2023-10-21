import { getProductSummary } from '@/redux/modules/productSummary/selectors';
import { normalizeNumber } from '@/utils/normalize_number';
import { Divider, Typography } from 'antd';
import { ConnectedProps, connect } from 'react-redux';
import styles from './styles.module.scss';

const { Text } = Typography;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function TotalSummary(props: Props) {
  return (
    <div>
      <div className={styles.item_summary}>
        <Text>Собівартість</Text>
        <Text>{normalizeNumber(props.summary.selfCost).toFixed(2)} грн.</Text>
      </div>
      <div className={styles.item_summary}>
        <Text>Постійні витрати</Text>
        <Text>{normalizeNumber(props.summary.fixedCost).toFixed(2)} грн.</Text>
      </div>
      <div className={styles.item_summary}>
        <Text>Змінні витрати</Text>
        <Text>
          {normalizeNumber(props.summary.variableCost).toFixed(2)} грн.
        </Text>
      </div>
      <Divider />
      <div className={styles.item_summary}>
        <Text strong>РАЗОМ</Text>
        <Text strong>
          {normalizeNumber(props.summary.totalPrice).toFixed(2)} грн.
        </Text>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  summary: getProductSummary(store),
});

const connector = connect(mapStateToProps, null);
export default connector(TotalSummary);
