import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  Divider,
  List,
  PageHeader,
  Spin,
  Tag,
  Typography,
  Modal,
} from "antd";
import quizAPI from "apis/quiz";
import Notification from "components/Notification";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

const { Text } = Typography;
const { confirm } = Modal;

function QuizList() {
  const history = useHistory();
  let { post } = useParams();
  const [info, setInfo] = useState();
  const [quizzes, setQuizzes] = useState();
  const [loading, setLoading] = useState(true);

  const getQuizzes = async () => {
    const res = await quizAPI.getQuizBySubId({ subjectId: parseInt(post) });
    setLoading(false);
    if (res.status === "Success") {
      setQuizzes(res.testFound);
      setInfo(res.subjectName);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, [post]);

  const remove = async (id) => {
    confirm({
      title: "Notification",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure delete this task?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const res = await quizAPI.removeQuiz({ quizTestId: id });
        if (res.status === "Success") {
          getQuizzes();
          Notification("success", res.message);
        } else {
          Notification("error", res.message);
        }
      },
      onCancel() {},
    });
  };

  return (
    <div className="app__third-child">
      <Spin spinning={loading}>
        <PageHeader
          className="site-page-header"
          onBack={() => history.goBack()}
          title={info}
          style={{ marginBottom: 20 }}
        />
        <List
          grid={{ gutter: 16, column: 1 }}
          footer={<div>Record: {quizzes?.length}</div>}
          dataSource={quizzes}
          pagination={{
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                size="small"
                title={
                  <Link to={`/creator/quiz-detail/${item.id}`}>
                    {item.testName}
                  </Link>
                }
                extra={
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => remove(item.id)}
                  />
                }
              >
                <Descriptions column={4}>
                  <Descriptions.Item label="Lessons" span={4}>
                    {item.lessions.map((el) => {
                      return (
                        <Link
                          key={el.lessionId}
                          to={`/creator/lesson/${el.lessionId}`}
                        >
                          <Text underline style={{ color: "#40a9ff" }}>
                            {el.lessionName} <Divider type="vertical" />
                          </Text>
                        </Link>
                      );
                    })}
                  </Descriptions.Item>
                  <Descriptions.Item label="Publish" span={2}>
                    {moment(item.createdDate).format("YYYY-MM-DD")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Questions" span={2}>
                    <Tag color="#108ee9">{item.total_question}</Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
}
export default QuizList;
