import {
  Accessory,
  AccessoryPriceType,
} from '@/redux/modules/productMaker/type';
import { classes } from '@/utils/classes';
import {
  validateNumberInputKey,
  validateNumberInputStatus,
} from '@/utils/validate_number_input';
import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import formStyles from '../form.module.scss';

const { Option } = Select;

type ItemFromProps = {
  index: number;
  data: Accessory;
  onChange: (index: number, product: Accessory) => void;
  onDelete: (index: number) => void;
};

export function ItemForm(props: ItemFromProps) {
  const [highlighted, setHighlight] = useState(false);

  const selectPriceType = (
    <Select
      value={props.data.priceType || AccessoryPriceType.one_unit}
      size="small"
      style={{ width: 110 }}
      onChange={(priceType) =>
        props.onChange(props.index, { ...props.data, priceType })
      }
    >
      <Option value={AccessoryPriceType.one_unit}>грн./шт.</Option>
      <Option value={AccessoryPriceType.fifty_units}>грн./50 шт.</Option>
    </Select>
  );

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
            addonAfter={selectPriceType}
            style={{ width: '180px' }}
            onKeyDown={validateNumberInputKey}
            status={validateNumberInputStatus(props.data.price)}
          />
        </div>
        <div className={formStyles.row_input}>
          <Input
            min={0}
            size="small"
            onChange={(e) =>
              props.onChange(props.index, {
                ...props.data,
                amount: e.target.value,
              })
            }
            value={props.data.amount}
            addonAfter="шт."
            style={{ width: '110px' }}
            onKeyDown={validateNumberInputKey}
            status={validateNumberInputStatus(props.data.amount)}
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
