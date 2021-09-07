import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Steps,
  Space,
  Form,
  Input,
  Select,
  Descriptions,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setModalQuiz } from "redux/reducer/creator";
import "./index.css";
import lessonAPI from "apis/lesson";
import questionAPI from "apis/question";

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
  const element = [];

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
    setResult(random(value));
  };

  console.log(result);

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
                    max={questionList?.length}
                    type="number"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Random question
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
        {current === 2 && <div className="step__wrapper"></div>}
      </div>
    </Modal>
  );
}
export default AddQuiz;
