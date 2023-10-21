import { Package } from '@/redux/modules/productMaker/type';
import { classes } from '@/utils/classes';
import {
  validateNumberInputKey,
  validateNumberInputStatus,
} from '@/utils/validate_number_input';
import { Button, Input } from 'antd';
import { useState } from 'react';
import styles from '../form.module.scss';

type BeadFormProps = {
  index: number;
  data: Package;
  onChange: (index: number, product: Package) => void;
  onDelete: (index: number) => void;
};

export function ItemForm(props: BeadFormProps) {
  const [highlighted, setHighlight] = useState(false);

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
            onChange={(e) =>
              props.onChange(props.index, {
                ...props.data,
                price: e.target.value,
              })
            }
            value={props.data.price}
            addonAfter="грн."
            style={{ width: '120px' }}
            onKeyDown={validateNumberInputKey}
            status={validateNumberInputStatus(props.data.price)}
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
