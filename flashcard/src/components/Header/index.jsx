import {
  LogoutOutlined,
  UserOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, Menu, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import images from "constants/images";
import { removeUserInfo } from "redux/reducer/user";
import Notification from "components/Notification";
import { memberList, donorList, adminList } from "./menu";
import "./index.css";
import { formatNumberToString } from "services/formatNumber";

const { Search } = Input;

function Header() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { userLogged } = useSelector((state) => state.user);

  let { search } = useLocation();
  let query = new URLSearchParams(search);
  const searchKey = query.get("key");

  const onSearch = (value) => {
    history.push(`/search/${value ? value : " "}`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="FC_UER">
        <Link to="/profile">
          <Button
            type="text"
            className="user__title"
            style={{ color: "#415BA9" }}
          >
            {userLogged?.fullName}
          </Button>
        </Link>
      </Menu.Item>

      {userLogged?.roleId === 2 &&
        adminList?.map((item) => {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.url}>
                <Button type="text" className="user__child">
                  {item.name}
                </Button>
              </Link>
            </Menu.Item>
          );
        })}

      {userLogged?.roleId === 3 &&
        donorList?.map((item) => {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.url}>
                <Button type="text" className="user__child">
                  {item.name}
                </Button>
              </Link>
            </Menu.Item>
          );
        })}

      {userLogged?.roleId === 1 &&
        memberList?.map((item) => {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.url}>
                <Button type="text" className="user__child">
                  {item.name}
                </Button>
              </Link>
            </Menu.Item>
          );
        })}

      <Menu.Item key="QWE13">
        <Button
          type="text"
          className="user__child"
          icon={<LogoutOutlined />}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  const logout = async () => {
    // const response = await userAPI.logout();
    Notification("success", "Logout success");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    dispatch(removeUserInfo());
    history.replace("/login");
  };

  return (
    <header className="main__header">
      <Link
        to={
          (userLogged?.roleId === 1 && "/course") ||
          (userLogged?.roleId === 2 && "/admin") ||
          (userLogged?.roleId === 3 && "/donor") ||
          (!userLogged && "/")
        }
      >
        <img className="logo" src={images.LOGO} alt="logo" />
      </Link>
      <nav>
        <ul className="nav__links">
          {userLogged?.roleId === 1 && (
            <li>
              <Form form={form} initialValues={{ searchKey: searchKey }}>
                <Form.Item name="searchKey" noStyle>
                  <Search
                    allowClear
                    placeholder="Input search"
                    onSearch={onSearch}
                    enterButton
                  />
                </Form.Item>
              </Form>
            </li>
          )}
          {!userLogged && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!userLogged && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          {userLogged?.roleId === 1 && (
            <li className="nav-member__point">
              <Link to="/profile/point">
                <Button icon={<SketchOutlined />} type="primary" ghost>
                  {formatNumberToString(userLogged?.point, 4)}
                </Button>
              </Link>
            </li>
          )}
          {userLogged && (
            <li>
              <Dropdown overlay={menu} overlayClassName="nav__menus">
                <Avatar
                  style={{ backgroundColor: "#1890FF", cursor: "pointer" }}
                  size={30}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
