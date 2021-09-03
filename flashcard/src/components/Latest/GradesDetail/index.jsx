import { FileDoneOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Space, Spin } from "antd";
import quizAPI from "apis/quiz";
import Paging from "components/Pagination";
import { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import { useHistory, useParams } from "react-router-dom";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function GradesDetail() {
  const history = useHistory();
  const [form] = Form.useForm();
  let { uid, post } = useParams();
  const [info, setInfo] = useState();
  const [detail, setDetail] = useState([]);

  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);

  const indexOfLastPost = current * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = detail?.slice(indexOfFirstPost, indexOfLastPost);

  const [choice, setChoice] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await quizAPI.reviewDetail({ historyId: uid });
      setInfo(response.history);
      setDetail(response.test_detail?.listQuestion);
      let data = getCorrect(response.user_choice);
      setChoice(data);
      setTimeout(setLoading(false), 1000);
    };
    getData();
  }, [uid]);

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

  const getCorrect = (values) => {
    let array = [];
    values?.map((item) => {
      JSON.parse(item.optionId).map((element) => {
        array.push(element);
      });
    });
    return array;
  };

  useEffect(() => {
    form.setFieldsValue({
      group: choice,
    });
  }, [choice]);
  return (
    <div className="app__first-child">
      <Spin spinning={loading}>
        <p style={{ textAlign: "center" }}>{"QID" + info?.historyId}</p>
        <Form name="basic" form={form}>
          <Form.Item name="group">
            <Checkbox.Group disabled style={{ width: "100%" }}>
              {currentPosts?.map((item, index) => {
                return (
                  <div
                    className="q-content__container"
                    key={`QUESTION-${item?.questionId}`}
                  >
                    <div className="q-content__qs">
                      <div className="q-content__count">
                        <Button shape="circle">{count(index)}</Button>
                      </div>
                      {renderHTML(item?.questionContent)}
                      <Divider />
                    </div>
                    <div className="q-content__qs">
                      <Space direction="vertical">
                        {item?.options.map((option, index) => {
                          return (
                            <Checkbox
                              value={option.optionId}
                              key={`OPTION-${option.optionId}`}
                            >
                              {alphabet[index] + ") " + option.optionContent}
                            </Checkbox>
                          );
                        })}
                      </Space>
                    </div>
                    <div
                      className="q-content__qs"
                      style={{ background: "#FFFBE6" }}
                    >
                      {item?.options.map((option, index) => {
                        if (option.isCorrect === true) {
                          return (
                            <p key={`ANS-${option.optionId}`}>
                              {alphabet[index] + ") " + option.optionContent}
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </Checkbox.Group>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ float: "right" }}
              icon={<FileDoneOutlined />}
              type="primary"
              onClick={() => history.push(`/latest/${post}`)}
            >
              Finish review
            </Button>
          </Form.Item>
        </Form>
        <Paging
          total={detail ? detail?.length : 1}
          current={current}
          onChangePage={setCurrent}
        />
      </Spin>
    </div>
  );
}
export default GradesDetail;
