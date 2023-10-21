import { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  category: string;
  price: number;
  width: number;
  height: number;
  weight: number;
  estimate: string;
  colors_count: number;
  cost: number;
  created_count: number;
  sold_count: number;
}

export const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Properties',
    children: [
      {
        title: 'Width',
        dataIndex: 'width',
        key: 'width',
      },
      {
        title: 'Height',
        dataIndex: 'height',
        key: 'height',
      },
      {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
      },
      {
        title: 'Colors',
        dataIndex: 'colors_count',
        key: 'colors_count',
      },
    ],
  },
  {
    title: 'Estimate',
    dataIndex: 'estimate',
    key: 'estimate',
  },
  {
    title: 'Prices',
    children: [
      {
        title: 'Sale price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Cost of creation',
        dataIndex: 'cost',
        key: 'cost',
      },
    ],
  },
  {
    title: 'Products',
    children: [
      {
        title: 'Created',
        dataIndex: 'created_count',
        key: 'created_count',
      },
      {
        title: 'Sold',
        dataIndex: 'sold_count',
        key: 'sold_count',
      },
    ],
  },
];
