import quizAPI from "apis/quiz";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  List,
  Card,
  PageHeader,
  Descriptions,
  Space,
  Checkbox,
  Spin,
  Typography,
} from "antd";
import moment from "moment";
import renderHTML from "react-render-html";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const { Text } = Typography;

function QuizDetail() {
  let { post } = useParams();
  const history = useHistory();
  const [info, setInfo] = useState();
  const [detail, setDetail] = useState();
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      const res = await quizAPI.getQuizDetail({ quizTestId: post });
      console.log(res);
      if (res.status === "Success") {
        setDetail(res.listQuestion);
        setInfo(res.quiztestInfo);
      }
      setLoading(false);
    };
    getDetail();
  }, [post]);

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
    <div className="app__third-child">
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title={info?.testName}
        subTitle={moment(info?.createdDate).format("YYYY-MM-DD")}
        style={{ marginBottom: 20 }}
      />
      <List
        loading={loading}
        footer={
          <div>
            Record: <Text strong>{detail?.length}</Text>
          </div>
        }
        grid={{ gutter: 16, column: 1 }}
        pagination={{
          onChange: (page) => {
            setCurrent(page);
          },
          pageSize: 10,
        }}
        dataSource={detail}
        renderItem={(item, index) => (
          <List.Item>
            <Card>
              <Descriptions>
                <Descriptions.Item label="Q" style={{ padding: "5px 0" }}>
                  <Text strong>{count(index)}</Text>
                </Descriptions.Item>
              </Descriptions>
              <div>
                <div>{renderHTML(item.questionContent)}</div>
                <div>
                  <Space direction="vertical">
                    {item?.options.map((option, index) => {
                      return (
                        <Checkbox
                          value={option.optionId}
                          key={option.optionId}
                          checked={option.isCorrect}
                        >
                          {alphabet[index] + ") " + option.optionContent}
                        </Checkbox>
                      );
                    })}
                  </Space>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
export default QuizDetail;
