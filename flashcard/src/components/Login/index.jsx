import { HomeOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import userAPI from "apis/user";
import Notification from "components/Notification";
import images from "constants/images";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { saveUserInfo } from "redux/reducer/user";
import "./index.css";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const response = await userAPI.login(values);
    if (response.status === "Success") {
      Notification("success", "Login success");
      localStorage.setItem("token", response.tokens);
      localStorage.setItem("refresh", response.refreshToken);
      const account = await jwtDecode(response.tokens);
      dispatch(saveUserInfo(account));
      switch (account?.roleId) {
        case 1: {
          history.push("/course");
          break;
        }
        case 2: {
          history.push("/admin");
          break;
        }
        case 3: {
          history.push("/donor");
          break;
        }
        default:
          break;
      }
    } else {
      Notification("error", response.Message);
    }
  };

  return (
    <div className="limiter">
      <div className="login-container">
        <div className="login-wrap">
          <div className="login-form">
            <Form
              name="basic"
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
            >
              <h1 className="login-title">Login</h1>
              <p className="login-desc">
                See your growth and get consulting support!
              </p>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button size="large" htmlType="submit" className="btn">
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="login-image">
            <img src={images.LOGIN} alt="photo" />
            <Link to="/">
              <Button
                className="btn__back"
                type="primary"
                shape="circle"
                icon={<HomeOutlined />}
              />
            </Link>
            <div className="login-image__link">
              <p>
                {"Not registered yet? "}
                <Link
                  style={{ color: "#40a9ff", fontWeight: 600 }}
                  to="/register"
                >
                  REGISTER
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
