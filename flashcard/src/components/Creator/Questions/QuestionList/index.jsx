import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Empty, Form, Input, Modal, Space, Spin } from "antd";
import questionAPI from "apis/question";
import Paging from "components/Pagination";
import { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import { useParams } from "react-router";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const { Search } = Input;
const { confirm } = Modal;
const getCorrect = (values) => {
  let array = [];
  values?.map((item) => {
    item.option.map((el) => {
      if (el.isCorrect.data[0] === 1) {
        array.push(el.optionId);
      }
    });
  });
  return array;
};

function QuestionList() {
  let { post } = useParams();
  const [questions, setQuestions] = useState([]);
  const [form] = Form.useForm();

  const [choice, setChoice] = useState([]);

  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);

  const indexOfLastPost = current * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = questions?.slice(indexOfFirstPost, indexOfLastPost);

  const getData = async () => {
    const response = await questionAPI.getQuestionByFlashId({
      flashcardId: post,
    });
    setQuestions(response.data);
    let data = getCorrect(response.data);
    setChoice(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [post]);

  useEffect(() => {
    form.setFieldsValue({
      group: choice,
    });
  }, [choice]);

  return (
    <div className="app__third-child">
      <Spin spinning={loading}>
        <Form name="basic" form={form}>
          <Form.Item name="group">
            <Checkbox.Group disabled style={{ width: "100%" }}>
              {currentPosts?.map((item, index) => {
                return (
                  <div
                    className="q-content__container"
                    key={`QUESTION-${item.question.questionId}`}
                  >
                    <div className="q-content__qs">
                      <div className="q-content__count">
                        <Button shape="circle">{++index}</Button>
                      </div>
                      {renderHTML(item.question.questionContent)}
                    </div>
                    <div className="q-content__qs">
                      <Space direction="vertical">
                        {item?.option.map((el, index) => {
                          return (
                            <Checkbox
                              value={el.optionId}
                              key={`OPTION-${el.optionId}`}
                            >
                              {alphabet[index] + ") " + el.optionContent}
                            </Checkbox>
                          );
                        })}
                      </Space>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        key="list-edit"
                        className="button--mg"
                      />
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        key="list--remove"
                        className="button--mg"
                      />
                    </div>
                  </div>
                );
              })}
            </Checkbox.Group>
          </Form.Item>
        </Form>
        {currentPosts && (
          <Paging
            total={questions ? questions?.length : 1}
            current={current}
            onChangePage={setCurrent}
          />
        )}
        {!currentPosts && <Empty />}
      </Spin>
    </div>
  );
}
export default QuestionList;
