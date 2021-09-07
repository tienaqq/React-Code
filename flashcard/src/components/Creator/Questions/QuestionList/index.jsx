import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Checkbox, List, Space, Modal } from "antd";
import questionAPI from "apis/question";
import ModalCreator from "components/Creator/ModalCreator";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import renderHTML from "react-render-html";
import { useParams } from "react-router";
import { setModalInfo } from "redux/reducer/creator";
import QuestionForm from "../QuestionForm";
import Notification from "components/Notification";
import "./index.css";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const { confirm } = Modal;

function QuestionList() {
  const dispatch = useDispatch();
  let { post } = useParams();
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(null);

  const getData = async () => {
    const response = await questionAPI.getQuestionByFlashId({
      flashcardId: post,
    });
    setQuestions(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [post]);

  const showModal = (item) => {
    if (item) {
      setUpdate(item);
      dispatch(setModalInfo({ title: "Update Question", isVisible: true }));
    } else {
      setUpdate(null);
      dispatch(setModalInfo({ title: "Add Question", isVisible: true }));
    }
  };

  const removeQuestion = async (id) => {
    console.log(id);
    confirm({
      title: "Notification",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure delete this item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const res = await questionAPI.removeQuestion({ questionId: id });
        if (res.status === "Success") {
          Notification("success", res.message);
          getData();
        } else {
          Notification("error", res.message);
        }
      },
      onCancel() {},
    });
  };

  return (
    <>
      <ModalCreator>
        <QuestionForm update={update} post={post} getData={getData} />
      </ModalCreator>
      <div className="app__third-child">
        <div className="tool__container">
          <div className="tool__left">
            <Button icon={<PlusOutlined />} onClick={() => showModal()}>
              Add Question
            </Button>
          </div>
          <div className="tool__right"></div>
        </div>
        <List
          loading={loading}
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 10,
          }}
          dataSource={questions}
          footer={
            <div>
              <b>Total:</b> {questions?.length}
            </div>
          }
          renderItem={(item, index) => (
            <Card size="small" className="app--mg20 q__card">
              <div>{renderHTML(item.question.questionContent)}</div>
              <Space direction="vertical">
                {item?.option.map((el, index) => {
                  return (
                    <Checkbox
                      disabled
                      value={el.optionId}
                      key={`OPTION-${el.optionId}`}
                      checked={el.isCorrect.data[0] === 1 ? true : false}
                    >
                      {alphabet[index] + ") " + el.optionContent}
                    </Checkbox>
                  );
                })}
              </Space>
              <Button className="q__button" shape="circle">
                {++index}
              </Button>
              <div className="q__tool">
                <Button
                  icon={<EditOutlined />}
                  type="text"
                  onClick={() => showModal(item)}
                />
                <Button
                  icon={<DeleteOutlined />}
                  type="text"
                  onClick={() => removeQuestion(item.question.questionId)}
                />
              </div>
            </Card>
          )}
        />
      </div>
    </>
  );
}
export default QuestionList;
