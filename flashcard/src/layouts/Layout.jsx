import { BackTop } from "antd";
import BottomAds from "components/Ads/BottomAds";
import Footer from "components/Footer";
import Header from "components/Header";

export default function Layout(props) {
  return (
    <>
      <BackTop />
      <Header />
      {props.children}
      <Footer />
      <BottomAds />
    </>
  );
}
