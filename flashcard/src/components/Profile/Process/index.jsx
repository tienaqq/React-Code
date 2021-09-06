import { DownCircleOutlined, PullRequestOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Menu, Table, Tag } from "antd";
import Moment from "moment";
import { useEffect, useState } from "react";
import requestAPI from "../../../apis/request";
import Notification from "../../Notification";

function Process() {
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubjects = async () => {
    const response = await requestAPI.requestSubjectToMe();
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
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
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Button
                  style={{ width: 100 }}
                  type="primary"
                  onClick={() => approveSubject(record.key)}
                >
                  Approve
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button
                  style={{ width: 100 }}
                  type="primary"
                  danger
                  onClick={() => denySubject(record.key)}
                >
                  Deny
                </Button>
              </Menu.Item>
            </Menu>
          }
          placement="bottomCenter"
        >
          <Button type="primary" icon={<DownCircleOutlined />} />
        </Dropdown>
      ),
    },
  ];
  const columnLesson = [
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
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
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Button
                  style={{ width: 100 }}
                  type="primary"
                  onClick={() => approveLesson(record.key)}
                >
                  Approve
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button
                  style={{ width: 100 }}
                  type="primary"
                  danger
                  onClick={() => denyLesson(record.key)}
                >
                  Deny
                </Button>
              </Menu.Item>
            </Menu>
          }
          placement="bottomCenter"
        >
          <Button type="primary" icon={<DownCircleOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const approveSubject = async (id) => {
    const response = await requestAPI.approveSubjectRequest({ requestId: id });
    if (response.status === "Success") {
      Notification("success", response.message);
      getSubjects();
    } else {
      Notification("error", response.message);
    }
  };

  const denySubject = async (id) => {
    const response = await requestAPI.denySubjectRequest({ requestId: id });
    if (response.status === "Success") {
      Notification("success", response.message);
      getSubjects();
    } else {
      Notification("error", response.message);
    }
  };

  const approveLesson = async (id) => {
    const response = await requestAPI.approveLessonRequest({ requestId: id });
    if (response.status === "Success") {
      Notification("success", response.message);
      getLessons();
    } else {
      Notification("error", response.message);
    }
  };

  const denyLesson = async (id) => {
    const response = await requestAPI.denyLessonRequest({ requestId: id });
    if (response.status === "Success") {
      Notification("success", response.message);
      getLessons();
    } else {
      Notification("error", response.message);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button style={{ width: 100 }} type="primary">
          Approve
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button style={{ width: 100 }} type="primary" danger>
          Deny
        </Button>
      </Menu.Item>
    </Menu>
  );

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
