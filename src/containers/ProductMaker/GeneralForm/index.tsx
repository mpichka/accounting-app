import AdditionalExpensesModal from '@/containers/AdditionalExpensesModalWindow';
import ProductCategorySelector from '@/containers/ProductCategorySelector';
import { GerdanType } from '@/models/gerdan_type';
import {
  setCategory,
  setEstimate,
  setGerdanType,
  setImage,
  setLength,
  setMarge,
  setName,
  setPreview,
  setSchemaAuthor,
  setSchemaPrice,
  setSurcharge,
  setWeight,
  setWidth,
} from '@/redux/modules/productMaker/actions';
import { getProduct } from '@/redux/modules/productMaker/selectors';
import {
  validateNumberInputKey,
  validateNumberInputStatus,
} from '@/utils/validate_number_input';
import { Button, Input, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { UploadImage } from '../UploadImage';
import styles from './styles.module.scss';

const { Text, Title } = Typography;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const gerdanTypeOptions = [
  { value: GerdanType.no_type, label: 'Гердан без особливостей' },
  {
    value: GerdanType.type_one,
    label: 'Суцільний гердан без низок',
  },
  {
    value: GerdanType.type_two,
    label: 'Суцільний гердан з низками +5%',
  },
  {
    value: GerdanType.type_three,
    label: 'Гердан з низками всередині і знизками внизу +10%',
  },
  {
    value: GerdanType.type_four,
    label: 'Гердан круговий +20% або ручне ткацтво',
  },
  {
    value: GerdanType.type_five,
    label: 'Гердан з невеликою кількістю доплітів (виступи) +5%',
  },
];

function GeneralForm(props: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.product.category === 'Гердан') {
      props.setGerdanType(GerdanType.no_type);
    }
  }, [props.product.category]);

  return (
    <div>
      <Title level={4}>Загальна інформація</Title>
      <div className={styles.box}>
        <div className={styles.block}>
          <div className={styles.row}>
            <Input
              placeholder="Назва виробу"
              defaultValue={props.product.name}
              onChange={(e) => props.setName(e.target.value)}
              status={!props.product.name ? 'warning' : ''}
            />
          </div>
          <div className={styles.row}>
            <Text className={styles.row_label}>Автор схеми</Text>
            <Input
              size="small"
              defaultValue={props.product.schemaAuthor}
              onChange={(e) => props.setSchemaAuthor(e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <Text className={styles.row_label}>Вартість схеми</Text>
            <Input
              size="small"
              addonAfter="грн."
              defaultValue={props.product.schemaPrice}
              onChange={(e) => props.setSchemaPrice(e.target.value)}
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(props.product.schemaPrice)}
            />
          </div>
        </div>
        <div className={styles.block}>
          <UploadImage
            image={props.product.image}
            preview={props.product.preview}
            setImage={props.setImage}
            setPreview={props.setPreview}
          />
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.block}>
          <div className={styles.row}>
            <Text className={styles.row_label}>Довжина</Text>
            <Input
              size="small"
              addonAfter="см"
              defaultValue={props.product.length}
              onChange={(e) => props.setLength(e.target.value)}
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(props.product.length)}
            />
          </div>
          <div className={styles.row}>
            <Text className={styles.row_label}>Ширина</Text>
            <Input
              size="small"
              addonAfter="см"
              defaultValue={props.product.width}
              onChange={(e) => props.setWidth(e.target.value)}
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(props.product.width)}
            />
          </div>
          <div className={styles.row}>
            <Text className={styles.row_label}>Вага виробу</Text>
            <Input
              size="small"
              addonAfter="грам"
              defaultValue={props.product.weight}
              onChange={(e) => props.setWeight(e.target.value)}
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(props.product.weight)}
            />
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.row}>
            <Text className={styles.row_label}>Фонд накопичення</Text>
            <Input
              size="small"
              addonAfter="%"
              defaultValue={props.product.surcharge}
              onChange={(e) => props.setSurcharge(e.target.value)}
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(props.product.surcharge)}
            />
          </div>
          <div className={styles.row}>
            <Text className={styles.row_label}>Маржа</Text>
            <Input
              size="small"
              addonAfter="%"
              defaultValue={props.product.marge}
              onChange={(e) => props.setMarge(e.target.value)}
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(props.product.marge)}
            />
          </div>
          <div className={styles.row}>
            <Text className={styles.row_label}>Час виготовлення</Text>
            <Input
              size="small"
              addonAfter="годин"
              defaultValue={props.product.estimate}
              onChange={(e) => props.setEstimate(e.target.value)}
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(props.product.estimate)}
            />
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.row}>
            <Text className={styles.row_label}>Категорія</Text>
            <ProductCategorySelector
              value={props.product.category}
              onChange={props.setCategory}
            />
          </div>
          {props.product.category === 'Гердан' ? (
            <div className={styles.row}>
              <Text className={styles.row_label}>Складність гердану</Text>
              <Select
                defaultValue={props.product.gerdanType}
                size="small"
                onChange={(value) => props.setGerdanType(value)}
                options={gerdanTypeOptions}
              />
            </div>
          ) : (
            ''
          )}
          <div className={styles.row}>
            <Text className={styles.row_label}>Змінні та постійні витрати</Text>
            <Button type="default" size="small" onClick={() => setOpen(true)}>
              Налаштувати
            </Button>
          </div>
        </div>
      </div>

      <AdditionalExpensesModal open={open} setOpen={setOpen} />
    </div>
    // <div className={styles.form}>
    //   <div className={styles.form_header}>
    //     <Title level={4}>Загальна інформація</Title>
    //   </div>
    //   <div className={styles.columns}>
    //     <div className={styles.schemaPriceColumn}>
    //       <div className={styles.row}>
    //         <Input
    //           placeholder="Назва виробу"
    //           style={{ width: '400px' }}
    //           defaultValue={props.product.name}
    //           onChange={(e) => props.setName(e.target.value)}
    //           status={!props.product.name ? 'warning' : ''}
    //         />
    //       </div>
    //       <div>
    //         <div className={styles.row_inputs}>
    //           <Text style={{ marginRight: '8px' }}>Вартість схеми</Text>
    //           <Input
    //             size="small"
    //             style={{ width: '140px' }}
    //             addonAfter="грн."
    //             defaultValue={props.product.schemaPrice}
    //             onChange={(e) => props.setSchemaPrice(e.target.value)}
    //             onKeyDown={validateNumberInputKey}
    //             status={validateNumberInputStatus(props.product.schemaPrice)}
    //           />
    //         </div>
    //         <div className={styles.row_inputs}>
    //           <Text style={{ marginRight: '8px' }}>Автор схеми</Text>
    //           <Input
    //             size="small"
    //             style={{ width: '140px' }}
    //             defaultValue={props.product.schemaAuthor}
    //             onChange={(e) => props.setSchemaAuthor(e.target.value)}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <UploadImage
    //       image={props.product.image}
    //       preview={props.product.preview}
    //       setImage={props.setImage}
    //       setPreview={props.setPreview}
    //     />
    //   </div>
    //   <div className={styles.columns}>
    //     <div>
    //       <div className={styles.row}>
    //         <Text style={{ marginRight: '8px' }}>Довжина</Text>
    //         <Input
    //           size="small"
    //           style={{ width: '120px' }}
    //           addonAfter="см"
    //           defaultValue={props.product.length}
    //           onChange={(e) => props.setLength(e.target.value)}
    //           onKeyDown={validateNumberInputKey}
    //           status={validateNumberInputStatus(props.product.length)}
    //         />
    //       </div>
    //       <div className={styles.row}>
    //         <Text style={{ marginRight: '8px' }}>Ширина</Text>
    //         <Input
    //           size="small"
    //           style={{ width: '120px' }}
    //           addonAfter="см"
    //           defaultValue={props.product.width}
    //           onChange={(e) => props.setWidth(e.target.value)}
    //           onKeyDown={validateNumberInputKey}
    //           status={validateNumberInputStatus(props.product.width)}
    //         />
    //       </div>
    //       <div className={styles.row}>
    //         <Text style={{ marginRight: '8px' }}>Вага виробу</Text>
    //         <Input
    //           size="small"
    //           style={{ width: '120px' }}
    //           addonAfter="грам"
    //           defaultValue={props.product.weight}
    //           onChange={(e) => props.setWeight(e.target.value)}
    //           onKeyDown={validateNumberInputKey}
    //           status={validateNumberInputStatus(props.product.weight)}
    //         />
    //       </div>
    //     </div>
    //     <div>
    //       <div className={styles.row}>
    //         <Text style={{ marginRight: '8px' }}>Фонд накопичення</Text>
    //         <Input
    //           size="small"
    //           style={{ width: '120px' }}
    //           addonAfter="%"
    //           defaultValue={props.product.surcharge}
    //           onChange={(e) => props.setSurcharge(e.target.value)}
    //           onKeyDown={validateNumberInputKey}
    //           status={validateNumberInputStatus(props.product.surcharge)}
    //         />
    //       </div>
    //       <div className={styles.row}>
    //         <Text style={{ marginRight: '8px' }}>Маржа</Text>
    //         <Input
    //           size="small"
    //           style={{ width: '120px' }}
    //           addonAfter="%"
    //           defaultValue={props.product.marge}
    //           onChange={(e) => props.setMarge(e.target.value)}
    //           onKeyDown={validateNumberInputKey}
    //           status={validateNumberInputStatus(props.product.marge)}
    //         />
    //       </div>
    //       <div className={styles.row}>
    //         <Text style={{ marginRight: '8px' }}>Час виготовлення</Text>
    //         <Input
    //           size="small"
    //           style={{ width: '120px' }}
    //           addonAfter="годин"
    //           defaultValue={props.product.estimate}
    //           onChange={(e) => props.setEstimate(e.target.value)}
    //           onKeyDown={validateNumberInputKey}
    //           status={validateNumberInputStatus(props.product.estimate)}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <div className={styles.row}>
    //       <div>
    //         <Text style={{ marginRight: '8px' }}>Категорія</Text>
    //         <ProductCategorySelector
    //           value={props.product.category}
    //           onChange={props.setCategory}
    //         />
    //       </div>
    //       <div>
    //         <Text style={{ marginRight: '8px' }}>Складність гердану</Text>
    //         <Select
    //           defaultValue={props.product.gerdanType}
    //           size="small"
    //           style={{ width: '450px' }}
    //           onChange={(value) => props.setGerdanType(value)}
    //           options={[
    //             // { value: GerdanType.no_type, label: 'Не гердан' },
    //             {
    //               value: GerdanType.type_one,
    //               label: 'Суцільний гердан без низок',
    //             },
    //             {
    //               value: GerdanType.type_two,
    //               label: 'Суцільний гердан з низками +5%',
    //             },
    //             {
    //               value: GerdanType.type_three,
    //               label: 'Гердан з низками всередині і знизками внизу +10%',
    //             },
    //             {
    //               value: GerdanType.type_four,
    //               label: 'Гердан круговий +20% або ручне ткацтво',
    //             },
    //             {
    //               value: GerdanType.type_five,
    //               label: 'Гердан з невеликою кількістю доплітів (виступи) +5%',
    //             },
    //           ]}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className={styles.row}>
    //     <div className={styles.row_inputs}>
    //       <div className={styles.row_input}>
    //         <Text style={{ marginRight: '8px' }}>
    //           Змінні та постійні витрати
    //         </Text>
    //         <Button type="default" size="small" onClick={() => setOpen(true)}>
    //           Налаштувати
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    //   <AdditionalExpensesModal open={open} setOpen={setOpen} />
    // </div>
  );
}

const mapStateToProps = (store) => ({
  product: getProduct(store),
});

const mapDispatchToProps = (dispatch) => ({
  setImage: (payload: string | null) => dispatch(setImage(payload)),
  setPreview: (payload: string | null) => dispatch(setPreview(payload)),
  setName: (payload: string) => dispatch(setName(payload)),
  setSchemaPrice: (payload: string) => dispatch(setSchemaPrice(payload)),
  setSchemaAuthor: (payload: string) => dispatch(setSchemaAuthor(payload)),
  setGerdanType: (payload: string) => dispatch(setGerdanType(payload)),
  setWeight: (payload: string) => dispatch(setWeight(payload)),
  setLength: (payload: string) => dispatch(setLength(payload)),
  setWidth: (payload: string) => dispatch(setWidth(payload)),
  setEstimate: (payload: string) => dispatch(setEstimate(payload)),
  setSurcharge: (payload: string) => dispatch(setSurcharge(payload)),
  setMarge: (payload: string) => dispatch(setMarge(payload)),
  setCategory: (payload: string) => dispatch(setCategory(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(GeneralForm);
