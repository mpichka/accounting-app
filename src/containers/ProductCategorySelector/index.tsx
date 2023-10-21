import { Commands } from '@/commands';
import { AutoComplete } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export default function ProductCategorySelector(props: Props) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>();

  useEffect(() => {
    Commands.fetchAllProductCategories().then((res) =>
      setOptions(res.map((item) => ({ label: item, value: item })))
    );
  }, []);

  return (
    <AutoComplete
      options={options}
      style={{ width: 200 }}
      defaultValue={props.value}
      onChange={(value) => props.onChange(value)}
      filterOption={(inputValue, option) =>
        option!.value
          .toLocaleLowerCase()
          .indexOf(inputValue.toLocaleLowerCase()) !== -1
      }
      size='small'
    />
  );
}
