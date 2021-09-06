import { CodeSandboxOutlined } from "@ant-design/icons";
import { Divider, Table } from "antd";
import Moment from "moment";
import { useEffect, useState } from "react";
import requestAPI from "../../../apis/request";

function Sent() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRequest = async () => {
      const response = await requestAPI.requestSent();
      console.log(response);
      setList(response.listRequest);
      setTimeout(setLoading(false), 10000);
    };
    getRequest();
  }, []);

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  let data = [];
  list?.map((item) => {
    data.push({
      key: item.id,
      subject: item.subjectName,
      from: item.requestFrom,
      time: Moment(item.requestedAt).format("YYYY-MM-DD"),
      status: item.statusId,
    });
  });
  return (
    <div className="profile__container">
      <Divider orientation="left" plain>
        <CodeSandboxOutlined /> <Divider type="vertical" />
        Request Completion
      </Divider>
      <Table loading={loading} columns={columns} dataSource={data} />
    </div>
  );
}
export default Sent;
