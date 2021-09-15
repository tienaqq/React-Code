import { CodeSandboxOutlined } from "@ant-design/icons";
import { Divider, Table } from "antd";
import Moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import requestAPI from "apis/request";
import { Base64 } from "js-base64";
import { backRequestStatus } from "constants/backRequestStatus";

function Sent() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRequest = async () => {
      const response = await requestAPI.requestSent();
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
      render: (status) => backRequestStatus(status),
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text) => (
        <Link to={`/user/${Base64.encodeURI(text)}`}>{text}</Link>
      ),
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
        Request Sent
      </Divider>
      <Table loading={loading} columns={columns} dataSource={data} />
    </div>
  );
}
export default Sent;
