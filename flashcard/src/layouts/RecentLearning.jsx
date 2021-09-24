import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Image,
  Input,
  List,
  Progress,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import subjectAPI from "apis/subject";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Layout from "./Layout";

const { Text } = Typography;
const { Option } = Select;

function RecentLearning() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await subjectAPI.getRecent();
      if (res.status === "Success") {
        setRecent(res.recentSubject);
        setFiltered(res.recentSubject);
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    let array = [];
    recent?.map((item) => {
      array.push(item.accountId);
    });
    let unique = [...new Set(array)];
    setEmail(unique);
  }, [recent]);

  const onFinish = (values) => {
    let name = values.name;
    let author = values.author;
    let result = [];
    if (name && !author) {
      result = recent?.filter((el) => {
        return el.subjectName.toLowerCase().indexOf(name.toLowerCase()) !== -1;
      });
    } else if (!name && author) {
      result = recent?.filter((el) => el.accountId === author);
    } else if (name && author) {
      result = recent?.filter(
        (el) =>
          el.accountId === author &&
          el.subjectName.toLowerCase().indexOf(name.toLowerCase()) !== -1
      );
    } else {
      return setFiltered(recent);
    }
    return setFiltered(result);
  };

  const clear = () => {
    form.resetFields();
  };

  return (
    <Layout>
      <div className="app__container">
        <div className="app__wrapper">
          <div className="recent__main">
            <div className="recent__menu">
              <Divider orientation="left" plain>
                Search
              </Divider>
              <Form
                form={form}
                name="basic"
                autoComplete="off"
                onFinish={onFinish}
              >
                <Form.Item name="name">
                  <Input placeholder="Search name" />
                </Form.Item>

                <Form.Item name="author">
                  <Select placeholder="Search author" style={{ width: "100%" }}>
                    {email?.map((el) => {
                      return (
                        <Option key={el} value={el}>
                          {el}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "calc(50% - 5px)", marginRight: 10 }}
                    className="recent_pd"
                    type="primary"
                    htmlType="submit"
                    ghost
                  >
                    Search
                  </Button>
                  <Button
                    style={{ width: "calc(50% - 5px)" }}
                    className="recent_pd"
                    onClick={() => clear()}
                  >
                    Clear filter
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <List
              loading={loading}
              grid={{ gutter: 16, column: 1 }}
              dataSource={filtered}
              pagination={{
                pageSize: 10,
              }}
              header={
                <div>
                  My course: <b>{filtered?.length}</b>
                </div>
              }
              footer={
                <div>
                  <Alert
                    message="Take at least 30 minutes a day to make progress."
                    type="info"
                  />
                </div>
              }
              renderItem={(item) => (
                <List.Item key={item.subjectId}>
                  <Card size="small" hoverable className="record__card">
                    <Row gutter={[16, 16]}>
                      <Col xs={24} xl={24} xxl={4}>
                        <Image
                          style={{ width: "100%" }}
                          src={item.imageUrl || "error"}
                          alt="ads"
                          fallback="data:image/png;base64,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"
                        />
                      </Col>
                      <Col xs={24} xl={24} xxl={20}>
                        <Descriptions size="small" column={2}>
                          <Descriptions.Item span={2}>
                            <Text strong>{item.subjectName}</Text>
                          </Descriptions.Item>
                          <Descriptions.Item span={2}>
                            <Text>{item.subjectDescription}</Text>
                          </Descriptions.Item>
                          <Descriptions.Item label="Join Date">
                            <Tag color="blue">
                              {moment(item.joinDate).format("YYYY-DD-MM")}
                            </Tag>
                          </Descriptions.Item>
                          <Descriptions.Item label="Completion Flashcard">
                            <Tag color="#87d068">
                              <Text strong>
                                {item.completeFlashcard +
                                  " / " +
                                  item.totalFLashcard}
                              </Text>
                            </Tag>
                          </Descriptions.Item>
                          <Descriptions.Item label="Author" span={2}>
                            <b>{item.accountId}</b>
                          </Descriptions.Item>
                        </Descriptions>
                        <Progress
                          style={{ width: "calc(100% - 25px)" }}
                          percent={item.completePercent.toFixed(2)}
                        />
                      </Col>
                    </Row>
                    <Button
                      className="record__button"
                      type="primary"
                      onClick={() => history.push(`/latest/${item.subjectId}`)}
                    >
                      View
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default RecentLearning;
