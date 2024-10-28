import BannerProduct from '../components/BannerProduct.jsx';
import CategoryList from '../components/CategoryList.jsx';
import HomeProducts from '../components/HomeProducts.jsx';
// import Singleproducttest from '../components/Singleproducttest.jsx';

const Home = () => {
  return (
    <div>
      <BannerProduct />
      <CategoryList />
      <HomeProducts />
      {/* <Singleproducttest /> */}
    </div>
  );
};

export default Home;
