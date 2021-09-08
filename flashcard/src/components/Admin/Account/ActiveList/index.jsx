import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import Notification from "components/Notification";
import Moment from "moment";
import { useEffect, useState, useSelector } from "react";
import Highlighter from "react-highlight-words";

const { Text } = Typography;
const { TextArea } = Input;

function ActiveList() {
  const [form] = Form.useForm();
  // const a = useSelector((state) => state.admin.activeList);

  // console.log(a);

  return (
    <div>
      <div></div>
    </div>
  );
}
export default ActiveList;
