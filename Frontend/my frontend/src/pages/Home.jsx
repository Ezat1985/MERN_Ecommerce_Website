import BannerProduct from '../components/BannerProduct.jsx';
import CategoryList from '../components/CategoryList.jsx';
import HomeProducts from '../components/HomeProducts.jsx';

const Home = () => {
  return (
    <div>
      <BannerProduct />
      <CategoryList />
      <HomeProducts />
    </div>
  );
};

export default Home;
