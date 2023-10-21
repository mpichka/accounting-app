import { Thread, ThreadLengthType } from '@/redux/modules/productMaker/type';
import { classes } from '@/utils/classes';
import {
  validateNumberInputKey,
  validateNumberInputStatus,
} from '@/utils/validate_number_input';
import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import styles from '../form.module.scss';

const { Option } = Select;

type ItemFromProps = {
  index: number;
  data: Thread;
  onChange: (index: number, product: Thread) => void;
  onDelete: (index: number) => void;
};

export function ItemForm(props: ItemFromProps) {
  const [highlighted, setHighlight] = useState(false);

  const selectLengthType = (
    <Select
      defaultValue={ThreadLengthType.reel}
      value={props.data.lengthType || ThreadLengthType.reel}
      size="small"
      style={{ width: 100 }}
      onChange={(lengthType) =>
        props.onChange(props.index, { ...props.data, lengthType })
      }
    >
      <Option value={ThreadLengthType.reel}>котушок</Option>
      <Option value={ThreadLengthType.meter}>метрів</Option>
    </Select>
  );

  return (
    <div className={styles.row}>
      <div
        className={classes(
          styles.row_inputs,
          highlighted && styles.row_highlight
        )}
      >
        <div className={styles.row_input}>
          <Input
            placeholder="Назва"
            size="small"
            value={props.data.name}
            onChange={(e) =>
              props.onChange(props.index, {
                ...props.data,
                name: e.target.value,
              })
            }
            status={!props.data.name ? 'warning' : ''}
          />
        </div>
        <div className={styles.row_input}>
          <Input
            size="small"
            onChange={(e) => {
              props.onChange(props.index, {
                ...props.data,
                length: e.target.value,
              });
            }}
            value={props.data.length}
            addonAfter={selectLengthType}
            style={{ width: '200px' }}
            onKeyDown={validateNumberInputKey}
            status={validateNumberInputStatus(props.data.length)}
          />
        </div>
      </div>
      <Button
        danger
        size="small"
        onClick={() => props.onDelete(props.index)}
        onMouseEnter={() => setHighlight(true)}
        onMouseLeave={() => setHighlight(false)}
      >
        Видалити
      </Button>
    </div>
  );
}
