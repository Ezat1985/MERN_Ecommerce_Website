import BannerProduct from "../components/BannerProduct.jsx";
import CategoryList from "../components/CategoryList.jsx";
import Singleproducttest from "../components/Singleproducttest.jsx";
import HorizontalCardProduct from "../components/HorizontalCardProduct.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct
        category={"airpodes"}
        heading={"Top's SmartPhones"}
      />
      <Singleproducttest />
      <Footer />
    </div>
  );
};

export default Home;
