import {
  CalendarOutlined,
  DashboardOutlined,
  FormatPainterOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import {
  PAGE_CALENDAR,
  PAGE_DASHBOARD,
  PAGE_MATERIALS,
  PAGE_ORDERS,
  PAGE_ORDER_EDITOR,
  PAGE_PRODUCTS,
  PAGE_PRODUCT_EDITOR,
  PAGE_PURCHASES,
  setError,
  setPageCalendar,
  setPageDashboard,
  setPageMaterials,
  setPageOrderEditor,
  setPageOrders,
  setPageProductEditor,
  setPageProducts,
  setPagePurchases,
} from '@redux/app/actions';
import { getCurrentPage } from '@redux/app/selectors';
import type { MenuProps } from 'antd';
import { Layout, Menu, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Commands } from './commands';
import { CurrencyRatesTable } from './containers/CurrencyRatesTable';
import HeaderLine from './containers/HeaderLine';
import CreateProduct from './pages/CreateProduct';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import { getAppErrorMessage } from './redux/modules/app/selectors';
import styles from './styles.module.scss';

const { Sider, Content } = Layout;

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const items: MenuProps['items'] = [
  {
    label: 'Дошка',
    key: PAGE_DASHBOARD,
    icon: <DashboardOutlined />,
  },
  {
    label: 'Продукти',
    key: PAGE_PRODUCTS,
    icon: <StarOutlined />,
  },
  {
    label: 'Замовлення',
    key: PAGE_ORDERS,
    icon: <ShoppingOutlined />,
  },
  {
    label: 'Закупки',
    key: PAGE_PURCHASES,
    icon: <ShoppingCartOutlined />,
  },
  {
    label: 'Матеріали',
    key: PAGE_MATERIALS,
    icon: <FormatPainterOutlined />,
  },
  {
    label: 'Календар',
    key: PAGE_CALENDAR,
    icon: <CalendarOutlined />,
  },
];

function getPageContent(page: string) {
  switch (page) {
    case PAGE_DASHBOARD:
      return <Dashboard />;
    case PAGE_PRODUCTS:
      return <Products />;
    case PAGE_PRODUCT_EDITOR:
      return <CreateProduct />;
    case PAGE_ORDERS:
      return <div>Orders page</div>;
    case PAGE_ORDER_EDITOR:
      return <div>Order editor page</div>;
    case PAGE_MATERIALS:
      return <div>Materials page</div>;
    case PAGE_PURCHASES:
      return <div>Purchases page</div>;
    case PAGE_CALENDAR:
      return <div>Calendar page</div>;
    default:
      return <div>WARNING: This is unhandled error page!</div>;
  }
}

export function App(props: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [messageApi, messageCH] = message.useMessage();
  const [notificationApi, notificationCH] = notification.useNotification();

  useEffect(() => {
    if (props.errorMessage) {
      messageApi.error(props.errorMessage);
    }
  }, [props.errorMessage]);

  useEffect(() => {
    Commands.syncCurrencyRates()
      .then((res) => {
        if (res) {
          notificationApi.info({
            message: 'Курс валют',
            description: <CurrencyRatesTable data={res} />,
            placement: 'bottomRight',
          });
        }
      })
      .catch(() => {
        notificationApi.error({
          message: 'Курс валют',
          description:
            'Не вдалося оновити курс валют. Перевірте підключення до інтернету!',
          placement: 'bottomRight',
        });
      });
  }, []);

  const handlePageChange: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case PAGE_DASHBOARD:
        return props.setPageDashboard();
      case PAGE_PRODUCTS:
        return props.setPageProducts();
      case PAGE_PRODUCT_EDITOR:
        return props.setPageProductEditor();
      case PAGE_ORDERS:
        return props.setPageOrders();
      case PAGE_ORDER_EDITOR:
        return props.setPageOrderEditor();
      case PAGE_MATERIALS:
        return props.setPageMaterials();
      case PAGE_PURCHASES:
        return props.setPagePurchases();
      case PAGE_CALENDAR:
        return props.setPageCalendar();
      default:
        return props.setError('Unhandled router exception');
    }
  };

  return (
    <>
      {messageCH}
      {notificationCH}
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={60}
          className={styles.sider}
        >
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            onClick={handlePageChange}
            selectedKeys={[props.currentPage]}
          />
        </Sider>
        <Layout>
          <HeaderLine navCollapsed={collapsed} setCollapsed={setCollapsed} />
          <div className={styles.content}>
            {getPageContent(props.currentPage)}
          </div>
        </Layout>
      </Layout>
    </>
  );
}

const mapStateToProps = (store) => ({
  currentPage: getCurrentPage(store),
  errorMessage: getAppErrorMessage(store),
});

const mapDispatchToProps = (dispatch) => ({
  // fetchAdditionalExpenses: () => dispatch(fetchAdditionalExpenses()),
  setPageDashboard: () => dispatch(setPageDashboard()),
  setPageProducts: () => dispatch(setPageProducts()),
  setPageProductEditor: () => dispatch(setPageProductEditor()),
  setPageOrders: () => dispatch(setPageOrders()),
  setPageOrderEditor: () => dispatch(setPageOrderEditor()),
  setPageMaterials: () => dispatch(setPageMaterials()),
  setPagePurchases: () => dispatch(setPagePurchases()),
  setPageCalendar: () => dispatch(setPageCalendar()),
  setError: (message: string) => dispatch(setError(message)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
