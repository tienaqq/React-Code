import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import donorAPI from "apis/donor";
import Notification from "components/Notification";
import { fetchServices } from "redux/reducer/donor";
import store from "redux/store/store";

const { confirm } = Modal;
const remove = async (id) => {
  confirm({
    title: "Notification",
    icon: <ExclamationCircleOutlined />,
    content: "Are you sure delete this item?",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    async onOk() {
      const res = await donorAPI.deleteService({ serviceId: id });
      if (res.status === "Success") {
        Notification("success", res.message);
        store.dispatch(fetchServices());
      } else {
        Notification("error", res.message);
      }
    },
  });
};
export default remove;
