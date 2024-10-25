import BannerProduct from '../components/BannerProduct.jsx';
import CategoryList from '../components/CategoryList.jsx';
import Singleproducttest from '../components/Singleproducttest.jsx';
// import HorizontalCardProduct from '../components/HorizontalCardProduct.jsx';

const Home = () => {
  return (
    <div>
      <BannerProduct />
      {/* <HorizontalCardProduct category={'airpodes'} heading={''} /> */}
      <CategoryList />
      <Singleproducttest />
    </div>
  );
};

export default Home;
