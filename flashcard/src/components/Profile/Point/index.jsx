import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import { Divider, Table, Tag } from "antd";
import Moment from "moment";
import { useEffect, useState } from "react";
import pointAPI from "../../../apis/point";

function Point() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPointHistory = async () => {
      const response = await pointAPI.getPointHistory();
      setHistory(response.listHistory);
      setTimeout(setLoading(false), 10000);
    };
    getPointHistory();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => {
        if (text === 1 || text === 2 || text === 6 || text === 7) {
          return <ArrowDownOutlined style={{ color: "red" }} />;
        } else {
          return <ArrowUpOutlined style={{ color: "blue" }} />;
        }
      },
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => <Tag color="geekblue">{text}</Tag>,
    },
  ];

  const data = [];
  history.map((item) => {
    data.push({
      key: item.id,
      name: item.typeName,
      desc: item.usingDescription,
      type: item.typeId,
      point: item.point,
      time: Moment(item.dateOfUse).format("YYYY-MM-DD"),
    });
  });

  return (
    <div className="profile__container">
      <Divider orientation="left" plain>
        <SketchOutlined />
        <Divider type="vertical" />
        Point History
      </Divider>
      <Table
        loading={loading}
        size="small"
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}
export default Point;
