import {
  Button,
  Card,
  Descriptions,
  Progress,
  Tag,
  Tooltip,
  PageHeader,
} from "antd";
import Paging from "components/Pagination";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const title =
  "Need to complete at least 80% or retake at least 3 times of the test";

function GradesHistory() {
  let { hid, post } = useParams();
  const history = useHistory();
  const { listHistory } = useSelector((state) => state.latest);
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    let list = [];
    if (hid) {
      listHistory[0]?.listTest.map((item) => {
        if (item.quiztestId === parseInt(hid)) {
          setTitle(item.testName);
          setCount(item.child?.length);
          list = item.child;
        }
      });
    }
    setData(list);
  }, [listHistory, hid]);

  const indexOfLastPost = current * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  const per = (a, b) => {
    let per = 0;
    per = a / b;
    return per;
  };

  return (
    <div className="app__first-child">
      <PageHeader
        className="site-page-header"
        title={title}
        subTitle={`(${count}-Terms)`}
        onBack={() => history.goBack()}
        style={{ marginBottom: 30 }}
      />
      {currentPosts?.map((item) => {
        return (
          <Card
            hoverable
            size="small"
            title={"QID-" + item?.historyId}
            key={item?.historyId}
            style={{ marginBottom: 20, maxWidth: 930 }}
            extra={
              <Tooltip title={title}>
                <Button
                  type="text"
                  disabled={
                    per(item?.numOfQuestion / item?.numOfCorrect) >= 0.8 ||
                    data.length >= 3
                      ? false
                      : true
                  }
                  onClick={() =>
                    history.push(`/latest/${post}/review/${item?.historyId}`)
                  }
                >
                  Review
                </Button>
              </Tooltip>
            }
          >
            <Descriptions>
              <Descriptions.Item label="Total Question">
                {item?.numOfQuestion}
              </Descriptions.Item>
              <Descriptions.Item label="Correct">
                {item?.numOfCorrect}
              </Descriptions.Item>
              <Descriptions.Item label="Point">
                <Tag color="#f50">{item?.totalCore.toFixed(2)}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Time">
                {Moment(item?.takeQuizAt).format("MMMM Do YYYY, h:mm:ss a")}
              </Descriptions.Item>
              <Descriptions.Item label="Progress" span={2}>
                <Progress
                  style={{ maxWidth: 250 }}
                  percent={per(item?.numOfQuestion / item?.numOfCorrect)}
                  size="small"
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        );
      })}
      <Paging
        total={data ? data?.length : 1}
        current={current}
        onChangePage={setCurrent}
      />
    </div>
  );
}
export default GradesHistory;
