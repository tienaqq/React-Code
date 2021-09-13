import { PullRequestOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Table, Tag } from "antd";
import Moment from "moment";
import { useEffect, useState } from "react";
import requestAPI from "apis/request";
import Notification from "components/Notification";
import { Base64 } from "js-base64";
import { Link } from "react-router-dom";

function Process() {
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubjects = async () => {
    const res = await requestAPI.requestSubjectToMe();
    setSubjects(res.listRequest);
  };

  const getLessons = async () => {
    const res = await requestAPI.requestLessonToMe();
    setLessons(res.listRequest);
  };

  useEffect(() => {
    getLessons();
    getSubjects();
    setLoading(false);
  }, []);

  const dataSubject = [];
  subjects?.map((item) => {
    if (item.statusId === 1) {
      dataSubject.push({
        key: item.id,
        from: item.requestFrom,
        point: 30,
        time: Moment(item.requestedAt).format("YYYY-MM-DD"),
        subject: item.name,
        status: item.statusId,
      });
    }
  });

  const dataLesson = [];
  lessons?.map((item) => {
    if (item.statusId === 1) {
      dataLesson.push({
        key: item.id,
        from: item.requestFrom,
        point: 30,
        lesson: item.name,
        time: Moment(item.requestedAt).format("YYYY-MM-DD"),
        status: item.statusId,
      });
    }
  });

  const columnSubject = [
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text) => (
        <Link to={`/user/${Base64.encodeURI(text)}`}>{text}</Link>
      ),
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
      sorter: (a, b) => a.point - b.point,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) =>
        parseInt(a.time.replaceAll("-", "")) -
        parseInt(b.time.replaceAll("-", "")),
    },
    {
      title: "Subject",
      key: "subject",
      dataIndex: "subject",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => <Tag color="processing">Waiting</Tag>,
    },
    {
      title: "Action",
      key: "action",
      with: "70px",
      render: (record) => (
        <Space>
          <Button
            type="primary"
            ghost
            onClick={() => approveSubject(record.key)}
          >
            Approve
          </Button>
          <Button danger onClick={() => denySubject(record.key)}>
            Deny
          </Button>
        </Space>
      ),
    },
  ];
  const columnLesson = [
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text) => (
        <Link to={`/user/${Base64.encodeURI(text)}`}>{text}</Link>
      ),
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
      sorter: (a, b) => a.point - b.point,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) =>
        parseInt(a.time.replaceAll("-", "")) -
        parseInt(b.time.replaceAll("-", "")),
    },
    {
      title: "Lesson",
      key: "lesson",
      dataIndex: "lesson",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => <Tag color="processing">Waiting</Tag>,
    },
    {
      title: "Action",
      key: "action",
      with: "70px",
      render: (record) => (
        <Space>
          <Button
            type="primary"
            ghost
            onClick={() => approveLesson(record.key)}
          >
            Approve
          </Button>
          <Button danger onClick={() => denyLesson(record.key)}>
            Deny
          </Button>
        </Space>
      ),
    },
  ];

  const approveSubject = async (id) => {
    const res = await requestAPI.approveSubjectRequest({ requestId: id });
    if (res.status === "Success") {
      Notification("success", res.message);
      getSubjects();
    } else {
      Notification("error", res.message);
    }
  };

  const denySubject = async (id) => {
    const res = await requestAPI.denySubjectRequest({ requestId: id });
    if (res.status === "Success") {
      Notification("success", res.message);
      getSubjects();
    } else {
      Notification("error", res.message);
    }
  };

  const approveLesson = async (id) => {
    const res = await requestAPI.approveLessonRequest({ requestId: id });
    if (res.status === "Success") {
      Notification("success", res.message);
      getLessons();
    } else {
      Notification("error", res.message);
    }
  };

  const denyLesson = async (id) => {
    const res = await requestAPI.denyLessonRequest({ requestId: id });
    if (res.status === "Success") {
      Notification("success", res.message);
      getLessons();
    } else {
      Notification("error", res.message);
    }
  };

  return (
    <div className="profile__container">
      <Divider orientation="left" plain>
        <PullRequestOutlined /> <Divider type="vertical" />
        Subject request
      </Divider>
      <Table
        size="small"
        loading={loading}
        columns={columnSubject}
        dataSource={dataSubject}
      />
      <Divider orientation="left" plain>
        <PullRequestOutlined /> <Divider type="vertical" /> Lesson request
      </Divider>
      <Table
        size="small"
        loading={loading}
        columns={columnLesson}
        dataSource={dataLesson}
      />
    </div>
  );
}
export default Process;
