import { PullRequestOutlined } from "@ant-design/icons";
import { Divider, Table, Tag } from "antd";
import { Base64 } from "js-base64";
import Moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import requestAPI from "../../../apis/request";

function Completion() {
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubjects = async () => {
    const response = await requestAPI.requestSubjectToMe();
    console.log(response);
    setSubjects(response.listRequest);
  };

  const getLessons = async () => {
    const response = await requestAPI.requestLessonToMe();
    setLessons(response.listRequest);
  };

  useEffect(() => {
    getLessons();
    getSubjects();
    setLoading(false);
  }, []);

  let history = [].concat(subjects, lessons);

  const data = [];
  history?.map((item) => {
    if (item.statusId !== 1) {
      data.push({
        key: item?.id,
        from: item?.requestFrom,
        unLock: item?.name,
        time: Moment(item?.requestedAt).format("YYYY-MM-DD"),
        status: item?.statusId,
      });
    }
  });

  const columns = [
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text) => (
        <Link to={`/user/${Base64.encodeURI(text)}`}>{text}</Link>
      ),
    },
    {
      title: "Tag",
      dataIndex: "unLock",
      key: "unLock",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => <Tag color="blue">{text}</Tag>,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      responsive: ["xxl"],
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      key: "status",
      filters: [
        {
          text: "Approved",
          value: 2,
        },
        {
          text: "Denied",
          value: 3,
        },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
      render: (status) => {
        if (status === 2) {
          return <Tag color="success">Approved</Tag>;
        } else {
          return <Tag color="error">Denine</Tag>;
        }
      },
    },
  ];

  return (
    <div className="profile__container">
      <Divider orientation="left" plain>
        <PullRequestOutlined /> <Divider type="vertical" />
        History request
      </Divider>
      <Table size="small" columns={columns} dataSource={data} />
    </div>
  );
}
export default Completion;
