import { Table } from 'antd';
import { columns } from './columns';

type Props = {
  data: any[];
};

export function ProductsTable(props: Props) {
  return (
    <Table
      dataSource={props.data.map((item) => ({ ...item, key: item.id }))}
      columns={columns}
      bordered
    />
  );
}
