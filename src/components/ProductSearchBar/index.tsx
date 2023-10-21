import {
  Button,
  Checkbox,
  Collapse,
  CollapseProps,
  Input,
  Slider,
  Space,
} from 'antd';
import './style.css';
import styles from './styles.module.scss';

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Ціна',
    children: (
      <div>
        <Slider range defaultValue={[0, 100]} min={0} max={4200} />
        <div
          style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}
        >
          <Input style={{ width: 80 }} />
          <Input style={{ width: 80 }} />
          <Button>ОК</Button>
        </div>
      </div>
    ),
  },
  {
    key: '2',
    label: 'Категорія',
    children: (
      <div>
        <Input placeholder="Категорія" style={{ marginBottom: 12 }} />
        <Space direction="vertical">
          <Checkbox>Категорія 1</Checkbox>
          <Checkbox>Категорія 2 </Checkbox>
          <Checkbox>Категорія 3 </Checkbox>
          <Checkbox>Категорія 4 </Checkbox>
          <Checkbox>Категорія 5 </Checkbox>
          <Checkbox>Категорія 6 </Checkbox>
        </Space>
      </div>
    ),
  },
];

function ProductSearchBar() {
  return (
    <div className={styles.box}>
      <div style={{ padding: 12 }}>
        <Input placeholder="Пошук" />
      </div>
      <Collapse
        ghost
        items={items}
        defaultActiveKey={1}
        style={{ padding: 0 }}
        expandIconPosition="end"
      />
    </div>
  );
}

export default ProductSearchBar;
