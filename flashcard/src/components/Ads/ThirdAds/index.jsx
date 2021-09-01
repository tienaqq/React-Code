import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";

const ThirdAds = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const dispatch = useDispatch();
  const { isThree } = useSelector((state) => state.ads);
  //   setTimeout(() => dispatch(isActiveThree(true)), 3000);

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
    <Link to="/">
      <div className={`ads3__banner`}>
        <figure className="ads3__wrapper" ref={ref1}>
          <h1 className="ads3__title" ref={ref2}>
            Good Morning
          </h1>
          <h2 className="ads3__desc" ref={ref3}>
            Beautiful Landscape Photography
          </h2>
          <p className="ads3__author" ref={ref4}>
            @Flashcard Ads
          </p>
        </figure>
      </div>
    </Link>
  );
};
export default ThirdAds;
