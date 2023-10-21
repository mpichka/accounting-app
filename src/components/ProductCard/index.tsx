import { Product } from '@/models/product';
import { EMPTY_IMAGE } from '@/utils/empty_image';
import { EditOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Image } from 'antd';

const { Meta } = Card;

type Props = {
  data: Product;
};

function ProductCard(props: Props) {
  console.log(props.data);

  return (
    <Card
      loading={!props.data}
      hoverable
      style={{ width: 200 }}
      cover={
        <Image
          width={200}
          src={'data:image/jpeg;base64,' + props.data.image || undefined}
          fallback={EMPTY_IMAGE}
          preview={false}
        />
      }
      actions={[
        <EditOutlined key="edit" />,
        <ShoppingCartOutlined key="shop" />,
      ]}
    >
      <Meta title={props.data?.name || `Виріб #${props.data.id}`} />
      {/* TODO: категорія це окрема таблиця */}
      <div>{props.data?.category}</div>
      <div>{props.data?.totalPrice}</div>
    </Card>
  );
}

export default ProductCard;
