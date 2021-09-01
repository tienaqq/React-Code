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
} from "antd";
import subjectAPI from "apis/subject";
import { backStatus } from "constants/backStatus";
import images from "constants/images";
import Layout from "layouts/Layout";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePostId } from "redux/action/user";
import "./index.css";

const { Panel } = Collapse;
const { confirm } = Modal;
const { Text } = Typography;

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
  }, []);

  const checkPublic = async (id) => {
    const response = await subjectAPI.checkPublic({ subjectId: id });
    if (response.status === "Success") {
      history.push(`/latest?post=${id}`);
    }
    if (response.status === "Failed") {
      confirm({
        title: "Notification",
        icon: <ExclamationCircleOutlined />,
        content: response.message,
        onOk() {
          savePublic(id);
        },
        onCancel() {},
      });
    }
  };

  const savePublic = async (id) => {
    const response = await subjectAPI.saveRelation({ subjectId: id });
    if (response.status === "Success") {
      history.push(`/latest?post=${id}`);
    } else {
      Notification("error", response.message);
    }
  };

  return (
    <Layout>
      <div className="app__container">
        <div className="course__container">
          <div className="course__banner app--shadow">
            <img src={images.COURSE} alt="photo" />
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
              defaultActiveKey={["0", "1", "2", "3", "4", "6"]}
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
                                cover={<img src={images.CARD} />}
                                extra={backStatus(sub.statusId)}
                                className="app--shadow"
                                actions={[
                                  <Button
                                    key="button"
                                    type="text"
                                    onClick={() => checkPublic(sub?.subjectId)}
                                  >
                                    {sub?.joinStatus}
                                    <CaretRightOutlined />
                                  </Button>,
                                ]}
                              >
                                <Descriptions>
                                  <Descriptions.Item span={3}>
                                    <Text strong>{sub.subjectName}</Text>
                                  </Descriptions.Item>
                                  <Descriptions.Item span={3}>
                                    {sub?.subjectDescription}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Point">
                                    <Text
                                      delete={
                                        sub?.joinStatus === "Joined"
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
                                  <Descriptions.Item span={3}>
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
                                      {sub.author}
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