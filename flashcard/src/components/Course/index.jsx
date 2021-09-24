import {
  CaretRightOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Descriptions,
  Modal,
  Row,
  Spin,
  Typography,
  Image,
} from "antd";
import subjectAPI from "apis/subject";
import Notification from "components/Notification";
import { backStatus } from "constants/backStatus";
import images from "constants/images";
import { getChangeInfo } from "helpers/me";
import Layout from "layouts/Layout";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Base64 } from "js-base64";
import { Link } from "react-router-dom";
import "./index.css";

const { Panel } = Collapse;
const { confirm } = Modal;
const { Text, Paragraph } = Typography;

function Course() {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userLogged } = useSelector((state) => state.user);

  const payload = {
    listTopicId: JSON.parse(userLogged?.interestTopic),
  };

  useEffect(() => {
    const getInterest = async () => {
      const response = await subjectAPI.getInterest(payload);
      setList(response.listData);
      if (response.status === "Success") {
        setLoading(false);
      }
    };
    getInterest();
  }, [payload]);

  const join = (item) => {
    const id = item?.subjectId;
    const point = item?.point_require;
    switch (item.joinStatus) {
      case "Not join":
        confirm({
          title: "Notification",
          icon: <ExclamationCircleOutlined />,
          content: `Do you agree to use ${point} points to join the course?`,
          async onOk() {
            const res = await subjectAPI.saveRelation({ subjectId: id });
            if (res.status === "Success") {
              Notification("success", res.message);
              getChangeInfo();
              history.push(`/latest/${id}`);
            } else {
              Notification("error", res.message);
            }
          },
          onCancel() {},
        });
        break;
      case "Join":
        history.push(`/latest/${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="app__container">
        <div className="course__container">
          <div className="course__banner app--shadow">
            <Image src={images.COURSE} alt="photo" preview={false} />
            <div className="course__info">
              <h3 className="course__title">
                Recommendations
                <br /> for you
              </h3>
            </div>
          </div>
        </div>
        <div className="course__container">
          <Spin spinning={loading}>
            <Collapse
              defaultActiveKey={["0", "1", "2", "3", "4", "6", "7", "8"]}
              ghost
              expandIconPosition="right"
            >
              {list?.map((item, index) => {
                if (item.listSubjects.length > 0 && index < 7) {
                  return (
                    <Panel
                      header={<Text strong>{item.topicDetail.topicName}</Text>}
                      key={`${index}`}
                    >
                      <Row gutter={[16, 16]}>
                        {item?.listSubjects.map((sub) => {
                          return (
                            <Col
                              xs={24}
                              sm={12}
                              md={12}
                              lg={8}
                              xl={6}
                              xxl={6}
                              key={sub?.subjectId}
                            >
                              <Card
                                hoverable
                                size="small"
                                cover={
                                  <img
                                    src={sub?.imageUrl}
                                    style={{ maxHeight: 130 }}
                                  />
                                }
                                extra={backStatus(sub.statusId)}
                                className="app--shadow"
                                actions={[
                                  <Button
                                    key="button"
                                    type="text"
                                    onClick={() => join(sub)}
                                  >
                                    Learn
                                    <CaretRightOutlined />
                                  </Button>,
                                ]}
                              >
                                <Descriptions>
                                  <Descriptions.Item span={3}>
                                    <Text strong>{sub.subjectName}</Text>
                                    {sub.joinStatus === "Join" && (
                                      <Text style={{ color: "#FD695A" }}>
                                        {" "}
                                        (Joined)
                                      </Text>
                                    )}
                                  </Descriptions.Item>
                                  <Descriptions.Item span={3}>
                                    <Paragraph
                                      ellipsis={{
                                        rows: 2,
                                        tooltip: sub?.subjectDescription,
                                      }}
                                    >
                                      {sub?.subjectDescription}
                                    </Paragraph>
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Point">
                                    <Text
                                      delete={
                                        sub?.joinStatus === "Join"
                                          ? true
                                          : false
                                      }
                                      strong={
                                        sub?.point_require !== 0 ? true : false
                                      }
                                    >
                                      {sub?.point_require}
                                    </Text>
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Publish" span={2}>
                                    {Moment(sub.createdDate).format(
                                      "YYYY-MM-DD"
                                    )}
                                  </Descriptions.Item>
                                  <Descriptions.Item span={2}>
                                    <Button
                                      icon={
                                        <Avatar
                                          style={{
                                            backgroundColor: "#1890FF",
                                            marginRight: "5px",
                                          }}
                                          size="small"
                                          icon={<UserOutlined />}
                                        />
                                      }
                                      style={{ paddingLeft: 0 }}
                                      type="text"
                                    >
                                      <Link
                                        to={`/user/${Base64.encodeURI(
                                          sub.accountId
                                        )}`}
                                      >
                                        {sub.author}
                                      </Link>
                                    </Button>
                                  </Descriptions.Item>
                                </Descriptions>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </Panel>
                  );
                }
              })}
            </Collapse>
          </Spin>
        </div>
      </div>
    </Layout>
  );
}
export default Course;
