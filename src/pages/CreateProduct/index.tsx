import ProductMaker from '@/containers/ProductMaker';
import ProductPreview from '@/containers/ProductPreview';
import { setPageProducts } from '@/redux/modules/app/actions';
import { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import '../page.css';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function EditProduct(props: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handlePageProducts = () => {
    props.setPageProducts();
  };

  return (
    <div className="page">
      <div className="left_sidebar">
        <ProductPreview />
      </div>
      <div className="content">
        <ProductMaker />
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({
  setPageProducts: () => dispatch(setPageProducts()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(EditProduct);
