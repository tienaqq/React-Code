import {
  ExclamationCircleOutlined,
  FileDoneOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Card, Descriptions, Modal, Tooltip } from "antd";
import quizAPI from "apis/quiz";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const styled = {
  border: "1px solid #ffffff",
};

const labelStyle = {
  fontWeight: "500",
  color: "#1890FF",
};

const { confirm } = Modal;

function TestList(props) {
  const { post } = props;
  const history = useHistory();
  const [list, setList] = useState([]);

  useEffect(() => {
    const getQuiz = async () => {
      const res = await quizAPI.getQuizBySubId({ subjectId: post });
      setList(res?.testFound);
    };
    getQuiz();
  }, [post]);

  const checkQuiz = async (id) => {
    const response = await quizAPI.checkQuizAccess({ quizTestId: id });
    if (response.status === "Success") {
      history.push(`/quiz?qid=${id}`);
    }
    if (response.status === "Failed") {
      confirm({
        title: "Notification",
        icon: <ExclamationCircleOutlined />,
        content:
          response.message +
          " :" +
          response.requireLesson.map((item) => item.lessionName) +
          " ",
      });
    }
  };

  return (
    <>
      {list?.map((item) => {
        return (
          <Card
            hoverable
            size="small"
            title={
              <>
                <FormOutlined />
                {" " + item.testName}
              </>
            }
            key={item.id}
            extra={
              <Button onClick={() => checkQuiz(item.id)} type="primary">
                Take quiz
              </Button>
            }
            style={{ marginBottom: 20 }}
          >
            <Descriptions
              bordered
              contentStyle={styled}
              labelStyle={labelStyle}
            >
              <Descriptions.Item label="Publish" span={2}>
                {Moment(item.createdDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item span={1}>
                {item.total_question}-Questions
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Tooltip
                    placement="right"
                    title="Please complete the lesson before taking the test"
                  >
                    Required
                  </Tooltip>
                }
                span={3}
              >
                {item.lessions.map((lesson) => {
                  return (
                    <Button
                      icon={<FileDoneOutlined />}
                      danger
                      ghost
                      key={lesson.lessionId}
                      style={{ marginRight: 15, color: "#555" }}
                    >
                      {lesson.lessionName}
                    </Button>
                  );
                })}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        );
      })}
    </>
  );
}
export default TestList;
