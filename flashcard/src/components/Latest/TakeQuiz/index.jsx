import { FieldTimeOutlined, FileDoneOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  Form,
  Modal,
  Space,
  Spin,
  Statistic,
} from "antd";
import quizAPI from "apis/quiz";
import Notification from "components/Notification";
import Paging from "components/Pagination";
import { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import { useHistory, useParams } from "react-router-dom";
import ModalResult from "../ModalResult";
import "./index.css";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const { Countdown } = Statistic;

function TakeQuiz() {
  let { qid } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [result, setResult] = useState(null);

  const [info, setInfo] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [list, setList] = useState([]);
  const [ans, setAns] = useState([]);
  const [per, setPer] = useState(0);

  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);

  const indexOfLastPost = current * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = quiz.slice(indexOfFirstPost, indexOfLastPost);

  const deadline = Date.now() + 1000 * 60 * quiz?.length;

  useEffect(() => {
    const getQuiz = async () => {
      const response = await quizAPI.getQuizDetail({ quizTestId: qid });
      setInfo(response?.quiztestInfo);
      setQuiz(response?.listQuestion);
      setLoading(false);
    };
    getQuiz();
  }, [qid]);

  useEffect(() => {
    setPer(parseInt(quiz?.length / 2));
    if (!quiz) return warning();
  }, [quiz]);

  const submitQuiz = async () => {
    let userChoice = [];
    ans?.map((item) => {
      item.child.map((el) => {
        userChoice.push({
          questionId: el.name,
          optionId_choice: el.ans ? el.ans : [],
        });
      });
    });
    const params = {
      quizTestId: qid,
      numOfQuestion: quiz?.length,
      userChoice: userChoice,
    };

    const response = await quizAPI.submitQuiz(params);
    if (response.status === "Success") {
      Notification("success", "Submit quiz success,");
      setIsModalVisible(true);
      setResult(response.result);
    } else {
      Notification("error", "Lost connection to server.");
    }
  };

  function onFinish() {
    submitQuiz();
  }

  const onFinishQuiz = () => {
    submitQuiz();
  };

  function warning() {
    Modal.warning({
      title: "There are no quiz ready for you.",
      content: "Back to home now?",
    });
    setTimeout(history.push("/latest"), 1000);
  }

  const save = (allFields) => {
    let tmp = [];
    tmp.push({
      key: current,
      child: allFields?.map((element) => {
        return {
          name: element?.name[0],
          ans: !element ? [] : element?.value,
        };
      }),
    });
    if (ans.length > 0) {
      const index = ans.findIndex((item) => item.key === current);
      const clone = [...ans];
      if (index > -1) {
        clone.splice(index, 1);
        if (clone?.length === 0) {
          return setAns(tmp);
        } else {
          clone.push({
            key: current,
            child: allFields?.map((element) => {
              return {
                name: element?.name[0],
                ans: element.value === undefined ? [] : element?.value,
              };
            }),
          });
          return setAns(clone);
        }
      }
      if (index === -1) {
        clone.push({
          key: current,
          child: allFields?.map((element) => {
            return {
              name: element?.name[0],
              ans: !element ? [] : element?.value,
            };
          }),
        });
        return setAns(clone);
      }
    } else {
      return setAns(tmp);
    }
  };

  const onFieldsChange = (changedFields, allFields) => {
    save(allFields);
    const oob = changedFields[0];
    const index = list.findIndex((element) => element === oob?.name[0]);
    let selected = [...list];
    if (index > -1) {
      if (oob?.value.length === 0) {
        const filteredItems = selected.filter((item) => item !== oob?.name[0]);
        return setList(filteredItems);
      }
    } else {
      selected.push(oob?.name[0]);
    }
    return setList(selected);
  };

  const count = (index) => {
    const start = current - 1;
    const end = ++index;
    if (start === 0) {
      return end;
    } else if (end % 10 === 0) {
      return `${start + 1}${0}`;
    } else {
      return `${start}${end}`;
    }
  };

  return (
    <div className="quiz__container">
      <ModalResult
        result={result}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <div className="quiz__wrapper">
        <div className="quiz__content">
          <Spin spinning={loading}>
            <Form name="basic" form={form} onFieldsChange={onFieldsChange}>
              {currentPosts?.map((item, index) => {
                return (
                  <div className="q-content__container" key={item?.questionId}>
                    <div className="q-content__qs">
                      <div className="q-content__count">
                        <Button shape="circle">{count(index)}</Button>
                      </div>
                      {renderHTML(item?.questionContent)}
                      <Divider />
                    </div>
                    <div className="q-content__qs">
                      <Form.Item name={item?.questionId} noStyle>
                        <Checkbox.Group>
                          <Space direction="vertical">
                            {item?.options.map((option, index) => {
                              return (
                                <Checkbox
                                  value={option.optionId}
                                  key={option.optionId}
                                >
                                  {alphabet[index] +
                                    ") " +
                                    option.optionContent}
                                </Checkbox>
                              );
                            })}
                          </Space>
                        </Checkbox.Group>
                      </Form.Item>
                    </div>
                  </div>
                );
              })}
              <Form.Item>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gridGap: "20px",
                  }}
                >
                  <Alert
                    message="Need to complete at least 50% of the questions"
                    type="warning"
                  />
                  <Button
                    size="large"
                    icon={<FileDoneOutlined />}
                    type="primary"
                    onClick={() => onFinishQuiz()}
                    disabled={list?.length >= per ? false : true}
                  >
                    Submit
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <Paging
              total={quiz ? quiz?.length : 1}
              current={current}
              onChangePage={setCurrent}
            />
          </Spin>
        </div>
        <div className="quiz__menu">
          <Countdown
            title={info?.testName}
            value={deadline}
            onFinish={onFinish}
            prefix={<FieldTimeOutlined />}
            valueStyle={{ color: "#cf1322" }}
            style={{ width: "100%" }}
          />
          <Space size={[8, 8]} wrap>
            {quiz?.map((item, index) => (
              <Button
                key={item?.questionId}
                style={{ width: 65 }}
                type={list.indexOf(item?.questionId) > -1 ? "primary" : "ghost"}
              >
                {++index}
              </Button>
            ))}
          </Space>
        </div>
      </div>
    </div>
  );
}
export default TakeQuiz;
