import { getProductSummary } from '@/redux/modules/productSummary/selectors';
import { RemainderRange, getRemainderRange } from '@/utils/get_reminder_case';
import { Typography } from 'antd';
import { ConnectedProps, connect } from 'react-redux';
import styles from './styles.module.scss';

const { Text } = Typography;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function AccessoriesSummary(props: Props) {
  if (!props.summary.accessoriesTotalCount) return null;

  function getElementsWord(count: number): string {
    const remainder = getRemainderRange(count);
    if (remainder === RemainderRange.one) return 'елемент';
    if (remainder === RemainderRange.few) return 'елементи';
    return 'елементів';
  }

  return (
    <div className={styles.item_summary}>
      <Text>
        {props.summary.accessoriesTotalCount}{' '}
        {getElementsWord(props.summary.accessoriesTotalCount)} фурнітури на суму
      </Text>
      <Text>{props.summary.accessoriesTotalPrice.toFixed(2)} грн.</Text>
    </div>
  );
}

const mapStateToProps = (store) => ({
  summary: getProductSummary(store),
});

const connector = connect(mapStateToProps, null);
export default connector(AccessoriesSummary);
