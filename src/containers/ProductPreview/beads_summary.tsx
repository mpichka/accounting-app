import { getProductSummary } from '@/redux/modules/productSummary/selectors';
import { RemainderRange, getRemainderRange } from '@/utils/get_reminder_case';
import { Typography } from 'antd';
import { ConnectedProps, connect } from 'react-redux';
import styles from './styles.module.scss';

const { Text } = Typography;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function BeadsSummary(props: Props) {
  if (!props.summary.beadsTotalCount) return null;

  function getBeadsWord(count: number): string {
    const remainder = getRemainderRange(count);
    if (remainder === RemainderRange.one) return 'бісер';
    if (remainder === RemainderRange.few) return 'бісери';
    return 'бісерів';
  }

  return (
    <div className={styles.item_summary}>
      <Text>
        {props.summary.beadsTotalCount}{' '}
        {getBeadsWord(props.summary.beadsTotalCount)} на суму
      </Text>
      <Text>{props.summary.beadsTotalPrice.toFixed(2)} грн.</Text>
    </div>
  );
}

const mapStateToProps = (store) => ({
  summary: getProductSummary(store),
});

const connector = connect(mapStateToProps, null);
export default connector(BeadsSummary);
