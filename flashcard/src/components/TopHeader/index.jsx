import { ExportOutlined, SketchOutlined } from "@ant-design/icons";
import { Button, Layout, Space, Tooltip } from "antd";
import Notification from "components/Notification";
import images from "constants/images";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { removeUserInfo } from "redux/reducer/user";
import { formatNumberToString } from "services/formatNumber";
import "./index.css";

const { Header } = Layout;

function TopHeader() {
  const { userLogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    // const response = await userAPI.logout();
    Notification("success", "Logout success");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    dispatch(removeUserInfo());
    history.replace("/login");
  };

  return (
    <Header>
      <Link to={userLogged ? "/course" : "/"}>
        <img className="logo" src={images.LOGO} alt="logo" />
      </Link>
      <Space>
        <Tooltip
          placement="bottom"
          title={
            (userLogged?.roleId === 2 && "Admin") ||
            (userLogged?.roleId === 3 && "Donor")
          }
        >
          <Button type="text">
            <b>{userLogged?.fullName}</b>
          </Button>
        </Tooltip>
        <Button type="primary" ghost icon={<SketchOutlined />}>
          {formatNumberToString(userLogged?.donorPoint, 4)}
        </Button>
        <Button
          type="primary"
          icon={<ExportOutlined />}
          onClick={() => logout()}
        />
      </Space>
    </Header>
  );
}
export default TopHeader;
