import { Divider } from 'antd';
import AccessoriesForm from './AccessoriesForm';
import AmortizationForm from './AmortizationForm';
import BeadsForm from './BeadsForm';
import GeneralForm from './GeneralForm';
import PackagesForm from './PackagesForm';
import ThreadsForm from './ThreadForm';
import styles from './styles.module.scss';

export default function ProductMaker() {
  return (
    <div className={styles.layout}>
      <GeneralForm />
      <Divider />
      <AmortizationForm />
      <Divider />
      <BeadsForm />
      <Divider />
      <AccessoriesForm />
      <Divider />
      <ThreadsForm />
      {/* TODO: move to ordering tab  */}
      {/* <PackagesForm /> */}
    </div>
  );
}
