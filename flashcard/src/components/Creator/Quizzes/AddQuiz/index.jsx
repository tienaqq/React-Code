import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  List,
  Modal,
  Select,
  Space,
  Steps,
  Typography,
} from "antd";
import lessonAPI from "apis/lesson";
import questionAPI from "apis/question";
import quizAPI from "apis/quiz";
import Notification from "components/Notification";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import renderHTML from "react-render-html";
import { setModalQuiz } from "redux/reducer/creator";
import "./index.css";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const { Step } = Steps;
const { Option } = Select;
const { Text } = Typography;

function AddQuiz(props) {
  const [form] = Form.useForm();
  const { isAddQuiz } = useSelector((state) => state.creator);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);

  const { post } = props;
  const [lessons, setLessons] = useState([]);
  const [one, setOne] = useState(null);
  const [listSelect, setListSelect] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLesson = async () => {
      const res = await lessonAPI.getLessonBySubId({ subjectId: post });
      if (res.status === "Success") {
        setLessons(res.lession);
      }
    };
    getLesson();
  }, [post]);

  useEffect(() => {
    let name = [];
    lessons?.map((item) => {
      one?.lessionArr.map((el) => {
        if (item.lessionId === parseInt(el)) {
          name.push(item);
        }
      });
    });
    setListSelect(name);
  }, [one, lessons]);

  useEffect(() => {
    const getQuestion = async () => {
      const array = one?.lessionArr.map(Number);
      const res = await questionAPI.getQuestionByListLessonId({
        lessionArr: array,
      });
      if (res.status === "Success") {
        setQuestions(res.flashcardObj);
      }
    };
    getQuestion();
  }, [one]);

  useEffect(() => {
    let qs = [];
    questions?.map((item) => {
      item.questions.map((el) => {
        qs.push(el);
      });
    });
    setQuestionList(qs);
  }, [questions]);

  const random = (value) => {
    let n = parseInt(value?.quantity);
    let arr = questionList;
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleCancel = () => {
    dispatch(setModalQuiz(false));
  };

  const finishOne = (values) => {
    setOne(values);
    next();
  };

  const finishSecond = (value) => {
    setLoading(true);
    setTimeout(() => {
      setResult(random(value));
      setLoading(false);
    }, 1000);
  };

  const remove = (id) => {
    let list = [...result];
    if (list?.length === 10) {
      return alert("The minimum number of questions is 10!");
    }
    const index = list.findIndex((item) => item.question.questionId === id);
    list.splice(index, 1);
    return setResult(list);
  };

  const getId = () => {
    let ids = [];
    result?.map((item) => {
      ids.push(item.question.questionId);
    });
    return ids;
  };

  const addQuiz = async () => {
    let arr = getId();
    const params = {
      subjectId: parseInt(post),
      testName: one.testName,
      lessionArr: one.lessionArr?.map((elem) => parseInt(elem, 10)),
      questionArr: arr,
    };
    const res = await quizAPI.addQuiz(params);
    if (res.status === "Success") {
      Notification("success", res.message);
      handleCancel();
    } else {
      Notification("error", res.message);
    }
  };

  return (
    <Modal
      title="Add Quiz"
      visible={isAddQuiz}
      onCancel={handleCancel}
      width={1000}
      footer={false}
    >
      <Steps size="small" current={current}>
        <Step title="Step 1" description="Set name and choose lessons." />
        <Step title="Step 2" description="Choose questions." />
        <Step title="Step 3" description="Review and submit." />
      </Steps>
      <div className="step__container">
        {current === 0 && (
          <div className="step__wrapper-one">
            <Form
              layout="vertical"
              name="normal_quiz"
              form={form}
              onFinish={finishOne}
            >
              <Form.Item
                name="testName"
                label="Quiz name:"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="lessionArr"
                label="Lesson"
                rules={[
                  {
                    required: true,
                    message: "Lesson is required!",
                  },
                ]}
              >
                <Select size="large" mode="multiple" allowClear>
                  {lessons.map((value) => {
                    return (
                      <Option
                        key={value.lessionId}
                        value={`${value.lessionId}`}
                      >
                        {value.lessionName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  style={{ marginRight: 15 }}
                  htmlType="submit"
                >
                  Next step
                </Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {current === 1 && (
          <div className="step__wrapper-two">
            <div className="two__first">
              <Descriptions title="Quiz Info" column={3}>
                <Descriptions.Item label="Name" span={3}>
                  {one?.testName}
                </Descriptions.Item>
                <Descriptions.Item label="Lessons" span={3}>
                  {listSelect?.map((item, index) => {
                    return item.lessionName + " | ";
                  })}
                </Descriptions.Item>
                <Descriptions.Item label="Questions" span={3}>
                  <Text mark>{result ? result.length : 0}</Text>
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className="two__second">
              <Form
                name="basic"
                layout="vertical"
                autoComplete="off"
                onFinish={finishSecond}
              >
                <Form.Item
                  label={"Number of question " + `(${questionList?.length})`}
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Quality is required!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    min={10}
                    max={questionList?.length}
                    type="number"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ marginRight: 10 }}
                  >
                    Random question
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={() => next()}
                    style={{ marginRight: 10 }}
                    disabled={result.length !== 0 ? false : true}
                  >
                    Next
                  </Button>
                  <Button htmlType="button" onClick={() => prev()}>
                    Previous
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
        {current === 2 && (
          <div className="step__wrapper-three">
            <List
              grid={{ gutter: 16, column: 1 }}
              header={
                <div>
                  <div>Quiz: {one?.testName}</div>
                  <div>Question: {result?.length}</div>
                </div>
              }
              footer={
                <div>
                  <Button type="primary" onClick={() => addQuiz()}>
                    Add Quiz
                  </Button>
                </div>
              }
              dataSource={result}
              pagination={{
                pageSize: 5,
              }}
              renderItem={(item) => (
                <List.Item>
                  <Card>
                    <Descriptions column={3}>
                      <Descriptions.Item span={3}>
                        {renderHTML(item.question.questionContent)}
                      </Descriptions.Item>
                      <Descriptions.Item span={3}>
                        <Space direction="vertical">
                          {item?.options.map((option, index) => {
                            return (
                              <Text key={option.optionId}>
                                {alphabet[index] + ") " + option.optionContent}
                              </Text>
                            );
                          })}
                        </Space>
                      </Descriptions.Item>
                    </Descriptions>
                    <div style={{ float: "right" }}>
                      <Button
                        danger
                        onClick={() => remove(item.question.questionId)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
export default AddQuiz;
