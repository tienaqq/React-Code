import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isActiveTwo } from "../../../redux/action/ads";
import "./index.css";

const SecondAds = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const dispatch = useDispatch();
  const { isTwo } = useSelector((state) => state.ads);
  setTimeout(() => dispatch(isActiveTwo(true)), 3000);

  useEffect(() => {
    gsap.to(ref1.current, 2.5, { backgroundPosition: "50% 52%" });
    gsap.to(ref2.current, 1, { opacity: 1, delay: 3 });
    gsap.to(ref3.current, 1, {
      x: 50,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
    });
    gsap.to(ref4.current, 3, { opacity: 1, delay: 5.4 });
  });

  return (
    <div className={`ads2__banner ${!isTwo && "ads2__hidden"}`}>
      <figure className="ads2__wrapper" ref={ref1}>
        <h1 className="ads2__title" ref={ref2}>
          Good Morning
        </h1>
        <h2 className="ads2__desc" ref={ref3}>
          Beautiful Landscape Photography
        </h2>
        <p className="ads2__author" ref={ref4}>
          @Flashcard Ads
        </p>
        <Button
          danger
          type="primary"
          className="ads2__close"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={() => dispatch(isActiveTwo(false))}
        />
      </figure>
    </div>
  );
};
export default SecondAds;
