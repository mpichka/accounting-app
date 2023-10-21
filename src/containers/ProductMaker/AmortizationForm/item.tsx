import { Amortization } from '@/redux/modules/productMaker/type';
import { classes } from '@/utils/classes';
import {
  validateNumberInputKey,
  validateNumberInputStatus,
} from '@/utils/validate_number_input';
import { Button, Input } from 'antd';
import { useState } from 'react';
import formStyles from '../form.module.scss';

type ItemFromProps = {
  index: number;
  data: Amortization;
  onChange: (index: number, product: Amortization) => void;
  onDelete: (index: number) => void;
};

export function ItemForm(props: ItemFromProps) {
  const [highlighted, setHighlight] = useState(false);

  return (
    <div className={formStyles.row}>
      <div
        className={classes(
          formStyles.row_inputs,
          highlighted && formStyles.row_highlight
        )}
      >
        <div className={formStyles.row_input}>
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
        <div className={formStyles.row_input}>
          <Input
            size="small"
            onChange={(e) =>
              props.onChange(props.index, {
                ...props.data,
                price: e.target.value,
              })
            }
            value={props.data.price}
            addonAfter="грн"
            style={{ width: '140px' }}
            onKeyDown={validateNumberInputKey}
            status={validateNumberInputStatus(props.data.price)}
          />
        </div>
        <div className={formStyles.row_input}>
          <Input
            size="small"
            onChange={(e) => {
              props.onChange(props.index, {
                ...props.data,
                periodInMonths: e.target.value,
              });
            }}
            value={props.data.periodInMonths}
            addonAfter="місяців"
            style={{ width: '160px' }}
            onKeyDown={validateNumberInputKey}
            status={validateNumberInputStatus(props.data.periodInMonths)}
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
