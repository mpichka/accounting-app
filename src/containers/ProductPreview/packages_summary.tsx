import { getProductSummary } from '@/redux/modules/productSummary/selectors';
import { RemainderRange, getRemainderRange } from '@/utils/get_reminder_case';
import { Typography } from 'antd';
import { ConnectedProps, connect } from 'react-redux';
import styles from './styles.module.scss';

const { Text } = Typography;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function PackagesSummary(props: Props) {
  if (!props.summary.packagesTotalCount) return null;

  function getPackagesWord(count: number): string {
    const remainder = getRemainderRange(count);
    if (remainder === RemainderRange.one) return 'пакет';
    if (remainder === RemainderRange.few) return 'пакети';
    return 'пакетів';
  }

  return (
    <div className={styles.item_summary}>
      <Text>
        {props.summary.packagesTotalCount}{' '}
        {getPackagesWord(props.summary.packagesTotalCount)} на суму
      </Text>
      <Text>{props.summary.packagesTotalPrice.toFixed(2)} грн.</Text>
    </div>
  );
}

const mapStateToProps = (store) => ({
  summary: getProductSummary(store),
});

const connector = connect(mapStateToProps, null);
export default connector(PackagesSummary);
