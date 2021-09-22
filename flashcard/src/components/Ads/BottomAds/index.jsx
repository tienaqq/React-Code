import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isActiveBottom } from "redux/reducer/ads";
import "./index.css";

const BottomAds = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const dispatch = useDispatch();
  const { isBottom, adsData } = useSelector((state) => state.ads);

  setTimeout(() => dispatch(isActiveBottom(true)), 300000);

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

  let img_bg = {
    backgroundImage: `url(${adsData?.imageLink})`,
  };

  return (
    <div className={`bottom__banner ${!isBottom && "bottom__hidden"}`}>
      <figure className="bottom__wrapper" style={img_bg} ref={ref1}>
        <a href={adsData?.target_url}>
          <h1 className="bottom__title" ref={ref2}>
            {adsData?.title}
          </h1>
          <h2 className="bottom__desc" ref={ref3}>
            {adsData?.content}
          </h2>
          <p className="bottom__author" ref={ref4}>
            @Flashcard Ads
          </p>
        </a>
        <Button
          size="small"
          danger
          type="primary"
          className="bottom__close"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={() => dispatch(isActiveBottom(false))}
        />
      </figure>
    </div>
  );
};
export default BottomAds;
