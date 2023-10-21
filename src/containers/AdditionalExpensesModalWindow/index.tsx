import { setAdditionalExpenses } from '@/redux/modules/additionalExpenses/actions';
import { getAdditionalExpenses } from '@/redux/modules/additionalExpenses/selectors';
import { AdditionalExpenses } from '@/redux/modules/additionalExpenses/type';
import {
  validateNumberInputKey,
  validateNumberInputStatus,
} from '@/utils/validate_number_input';
import { Divider, Input, Modal, Typography } from 'antd';
import { useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import styles from './styles.module.scss';

const { Text } = Typography;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  open: boolean;
  setOpen: (value: boolean) => void;
};

function AdditionalExpensesModal(props: Props) {
  const [additionalExpenses, setAdditionalExpenses] =
    useState<AdditionalExpenses>(props.additionalExpenses);

  const handleOk = () => {
    props.saveAdditionalExpenses(additionalExpenses);
    props.setOpen(false);
  };

  const handleCancel = () => {
    setAdditionalExpenses(props.additionalExpenses);
    props.setOpen(false);
  };

  const hasErrors =
    validateNumberInputStatus(additionalExpenses.qualification) ||
    validateNumberInputStatus(additionalExpenses.minimumWage) ||
    validateNumberInputStatus(additionalExpenses.electricityPrice) ||
    validateNumberInputStatus(additionalExpenses.costOfPublicService) ||
    validateNumberInputStatus(additionalExpenses.workshopRentalPrice);

  return (
    <>
      <Modal
        title="Змінні та постійні витрати"
        open={props.open}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        okText="Зберегти"
        cancelText="Скасувати"
        okButtonProps={{ disabled: !!hasErrors }}
      >
        <div>
          <div className={styles.item}>
            <Text style={{ marginRight: '8px' }}>Кваліфікація</Text>
            <Input
              size="small"
              style={{ width: '140px' }}
              addonAfter="років"
              value={additionalExpenses.qualification}
              onChange={(e) =>
                setAdditionalExpenses({
                  ...additionalExpenses,
                  qualification: e.target.value,
                })
              }
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(
                additionalExpenses.qualification
              )}
            />
          </div>
          <div className={styles.item}>
            <Text style={{ marginRight: '8px' }}>
              Оплата однієї години праці
            </Text>
            <Input
              size="small"
              style={{ width: '140px' }}
              addonAfter="грн."
              value={additionalExpenses.minimumWage}
              onChange={(e) =>
                setAdditionalExpenses({
                  ...additionalExpenses,
                  minimumWage: e.target.value,
                })
              }
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(additionalExpenses.minimumWage)}
            />
          </div>
          <div className={styles.item}>
            <Text style={{ marginRight: '8px' }}>
              Ціна за електрику (кіловат)
            </Text>
            <Input
              size="small"
              style={{ width: '140px' }}
              addonAfter="грн."
              value={additionalExpenses.electricityPrice}
              onChange={(e) =>
                setAdditionalExpenses({
                  ...additionalExpenses,
                  electricityPrice: e.target.value,
                })
              }
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(
                additionalExpenses.electricityPrice
              )}
            />
          </div>
          <div className={styles.item}>
            <Text style={{ marginRight: '8px' }}>
              Вартість комунальних послуг
            </Text>
            <Input
              size="small"
              style={{ width: '140px' }}
              addonAfter="грн."
              value={additionalExpenses.costOfPublicService}
              onChange={(e) =>
                setAdditionalExpenses({
                  ...additionalExpenses,
                  costOfPublicService: e.target.value,
                })
              }
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(
                additionalExpenses.costOfPublicService
              )}
            />
          </div>
          <div className={styles.item}>
            <Text style={{ marginRight: '8px' }}>Оренда майстерні</Text>
            <Input
              min={0}
              size="small"
              style={{ width: '140px' }}
              addonAfter="грн."
              value={additionalExpenses.workshopRentalPrice}
              onChange={(e) =>
                setAdditionalExpenses({
                  ...additionalExpenses,
                  workshopRentalPrice: e.target.value,
                })
              }
              onKeyDown={validateNumberInputKey}
              status={validateNumberInputStatus(
                additionalExpenses.workshopRentalPrice
              )}
            />
          </div>
        </div>
        <Divider />
      </Modal>
    </>
  );
}

const mapStateToProps = (store) => ({
  additionalExpenses: getAdditionalExpenses(store),
});

const mapDispatchToProps = (dispatch) => ({
  saveAdditionalExpenses: (payload) => dispatch(setAdditionalExpenses(payload)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AdditionalExpensesModal);
