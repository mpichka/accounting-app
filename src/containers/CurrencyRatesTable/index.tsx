import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

type CurrencyRate = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};

type Props = {
  data: CurrencyRate[];
};

const columns: ColumnsType<CurrencyRate> = [
  {
    title: 'Валюта',
    dataIndex: 'ccy',
    key: 'ccy',
    render: (value: string) => (
      <>
        <Text style={{ paddingRight: '12px' }}>{value}</Text>
        <Text type="secondary">UAH</Text>
      </>
    ),
    width: '60%',
  },
  {
    title: 'Купівля',
    dataIndex: 'buy',
    key: 'buy',
    render: (value: string) => (+value).toFixed(2),
  },
  {
    title: 'Продаж',
    dataIndex: 'sale',
    key: 'sale',
    render: (value: string) => (+value).toFixed(2),
  },
];

export function CurrencyRatesTable(props: Props) {
  return <Table dataSource={props.data} columns={columns} pagination={false} />;
}
