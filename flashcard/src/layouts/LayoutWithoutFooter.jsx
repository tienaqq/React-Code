import { BackTop } from "antd";
import BottomAds from "components/Ads/BottomAds";
import Header from "components/Header";

export default function LayoutWithoutFooter(props) {
  return (
    <>
      <BackTop />
      <Header />
      {props.children}
      <BottomAds />
    </>
  );
}
