import { getProductSummary } from '@/redux/modules/productSummary/selectors';
import { RemainderRange, getRemainderRange } from '@/utils/get_reminder_case';
import { Typography } from 'antd';
import { ConnectedProps, connect } from 'react-redux';
import styles from './styles.module.scss';

const { Text } = Typography;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ThreadsSummary(props: Props) {
  if (!props.summary.threadsTotalCount) return null;

  function getThreadWord(count: number): string {
    const remainder = getRemainderRange(count);
    if (remainder === RemainderRange.one) return 'нитка';
    if (remainder === RemainderRange.few) return 'нитки';
    return 'ниток';
  }

  return (
    <div className={styles.item_summary}>
      <Text>
        {props.summary.threadsTotalCount}{' '}
        {getThreadWord(props.summary.threadsTotalCount)} на суму
      </Text>
      <Text>{props.summary.threadsTotalPrice.toFixed(2)} грн.</Text>
    </div>
  );
}

const mapStateToProps = (store) => ({
  summary: getProductSummary(store),
});

const connector = connect(mapStateToProps, null);
export default connector(ThreadsSummary);
