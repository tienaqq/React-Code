import "./index.css";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import {
  GoogleOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <footer className="footer">
          <div className="footer-column">
            <Link to="/" className="logo">
              <img src={images.LOGO} alt="" className="logo-image" />
            </Link>
            <p className="text text--dark footer-desc">
              Flashcard – A learning tool system
            </p>
            <div className="social">
              <Link to="/" className="social-link bg-google">
                <GoogleOutlined />
              </Link>
              <Link to="/" className="social-link bg-twitter">
                <TwitterOutlined />
              </Link>
              <Link to="/" className="social-link bg-instagram">
                <InstagramOutlined />
              </Link>
            </div>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">Topics</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Languages
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Math
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Science
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Social Science
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">Feature</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Quiz live
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Partnerships
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Premium Content
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Terms of services
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">Address</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Ho Chi Minh
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  999 - 888 - 777
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  flashcard@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default Footer;
