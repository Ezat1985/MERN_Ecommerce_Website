import BannerProduct from "../components/BannerProduct.jsx";
import CategoryList from "../components/CategoryList.jsx";
import HomeProducts from "../components/HomeProducts.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div>
      <BannerProduct />
      <CategoryList />
      <HomeProducts />
      <Footer />
    </div>
  );
};

export default Home;
