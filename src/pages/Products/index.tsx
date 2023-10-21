import { PreviewMask } from '@/components/PreviewMask';
import ProductCard from '@/components/ProductCard';
import ProductSearchBar from '@/components/ProductSearchBar';
import { useAppDispatch } from '@/redux/hooks';
import { setPageProductEditor } from '@/redux/modules/app/actions';
import { loadProduct } from '@/redux/modules/productMaker/actions';
import { Product } from '@/redux/modules/productMaker/type';
import { fetchProductsList } from '@/redux/modules/products/actions';
import { getProducts } from '@/redux/modules/products/selectors';
import { EMPTY_IMAGE } from '@/utils/empty_image';
import { Button, Image, Layout, Select, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import '../page.css';

const { Sider, Content } = Layout;
const { Text, Title } = Typography;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const columns: ColumnsType<Product> = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Фото',
    dataIndex: 'image',
    key: 'image',
    render: (value) => {
      const image = typeof value === 'string' ? JSON.parse(value) : null;
      return (
        <Image
          width={100}
          src={image?.originUrl}
          fallback={EMPTY_IMAGE}
          preview={{
            title: image?.name,
            mask: <PreviewMask />,
          }}
        />
      );
    },
  },
  {
    title: 'Розміри (довжина, ширина, вага)',
    dataIndex: 'generalInfo',
    key: 'sizes',
    render: (_, record) => (
      <div>
        <span>д: {record?.length || 0} см. | </span>
        <span>ш: {record?.width || 0} см. | </span>
        <span>в: {record?.weight || 0} г.</span>
      </div>
    ),
    ellipsis: true,
  },
  {
    title: 'Термін виконання',
    dataIndex: 'estimate',
    key: 'estimate',
    render: (value) =>
      `${~~((value || 0) / 6)} днів, ${(value || 0) % 6} годин`,
  },
  {
    title: 'Ціна (грн.)',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },
  {
    title: 'Дії',
    key: 'action',
    render: (_, record) => <ActionButton record={record} />,
  },
];

function ActionButton(props: { record: any }) {
  const dispatch = useAppDispatch();

  return (
    <>
      <p>
        <Button
          onClick={() => {
            dispatch(loadProduct(props.record.id));
          }}
        >
          Редагувати
        </Button>
      </p>
    </>
  );
}

function Products(props: Props) {
  const { data, totalCount } = props.getProducts();

  useEffect(() => {
    props.fetchProductsList();
  }, []);

  const handlePageNewProduct = () => {
    props.setPageProductEditor();
  };

  return (
    <div className="page">
      <div className="left_sidebar">
        <ProductSearchBar />
      </div>
      <div className="content">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text strong type="secondary">
            Кількість результатів: 2000
          </Text>
          <div>
            <Select
              defaultValue={'7'}
              style={{ width: 220, marginRight: '16px' }}
              options={[
                { value: '7', label: 'Популярні' },
                { value: '5', label: 'В порядку зменшення А-Я' },
                { value: '6', label: 'В порядку збільшення Я-А' },
                { value: '3', label: 'Від дорогих до дешевих' },
                { value: '4', label: 'Від дешевих до дорогих' },
                { value: '1', label: 'Нові' },
                { value: '2', label: 'Найстаріші' },
              ]}
            />
            <Button onClick={handlePageNewProduct}>
              Створити новий продукт
            </Button>
          </div>
        </div>
        <Space wrap size={['middle', 'middle']}>
          {data?.length ? (
            data.map((item) => <ProductCard key={item.id} data={item as any} />)
          ) : (
            <></>
          )}
        </Space>
      </div>
      {/* <Table
        pagination={{
          total: totalCount,
          pageSizeOptions: [10, 20, 50],
          showTotal: (total) => `Загальна кількість: ${total}`,
          showSizeChanger: true,
          locale: { items_per_page: '/ сторінка' },
        }}
        dataSource={data}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: <Empty /> }}
      /> */}
    </div>
  );
}

const mapStateToProps = (store) => ({
  getProducts: () => getProducts(store),
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsList: () => dispatch(fetchProductsList()),
  setPageProductEditor: (id?: number) => dispatch(setPageProductEditor(id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Products);
