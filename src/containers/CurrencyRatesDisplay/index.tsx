import Currency from '@/components/Currency';
import { CurrencyType } from '@/models/currency';
import { Select } from 'antd';

function CurrencyRatesDisplay() {
  return (
    <Select
      defaultValue={CurrencyType.UAH}
      style={{ width: '120px' }}
      options={[
        {
          value: CurrencyType.UAH,
          label: <Currency variant={CurrencyType.UAH} />,
        },
        {
          value: CurrencyType.USD,
          label: <Currency variant={CurrencyType.USD} />,
        },
        {
          value: CurrencyType.EUR,
          label: <Currency variant={CurrencyType.EUR} />,
        },
      ]}
    />
  );
}

export default CurrencyRatesDisplay;
