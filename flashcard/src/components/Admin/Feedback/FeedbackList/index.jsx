import {
  Card,
  List,
  Rate,
  Space,
  Select,
  Descriptions,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackByAdmin } from "redux/reducer/admin";

const { Option } = Select;
const { Text } = Typography;

function FeedbackList() {
  const dispatch = useDispatch();
  const { feedbacks } = useSelector((state) => state.admin);
  const [list, setList] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchFeedbackByAdmin());
  }, []);

  console.log(feedbacks);

  const handleChange = (value) => {
    switch (value) {
      case "1":
        return setList(feedbacks?.filter((item) => item.point === 1));
      case "2":
        return setList(feedbacks?.filter((item) => item.point === 2));
      case "3":
        return setList(feedbacks?.filter((item) => item.point === 3));
      case "4":
        return setList(feedbacks?.filter((item) => item.point === 4));
      case "5":
        return setList(feedbacks?.filter((item) => item.point === 5));
      case "all":
        return setList(feedbacks);
      default:
        break;
    }
  };

  return (
    <div style={{ maxWidth: 1000 }}>
      <List
        grid={{ gutter: 16, column: 1 }}
        header={
          <Space>
            <Select
              style={{ width: 200 }}
              placeholder="Filter Rate"
              onChange={handleChange}
            >
              <Option value="1">
                1 <Rate disabled defaultValue={1} />
              </Option>
              <Option value="2">
                2 <Rate disabled defaultValue={2} />
              </Option>
              <Option value="3">
                3 <Rate disabled defaultValue={3} />
              </Option>
              <Option value="4">
                4 <Rate disabled defaultValue={4} />
              </Option>
              <Option value="5">
                5 <Rate disabled defaultValue={5} />
              </Option>
              <Option value="all">All Type</Option>
            </Select>
          </Space>
        }
        dataSource={list ? list : feedbacks}
        pagination={{
          pageSize: 10,
        }}
        renderItem={(item) => (
          <List.Item>
            <Card>
              <Descriptions column={3}>
                <Descriptions.Item label="From" span={3}>
                  <Text strong>{item.accountId}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Feedback" span={3}>
                  {item.content}
                </Descriptions.Item>
              </Descriptions>
              <Rate disabled defaultValue={item.point} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
export default FeedbackList;
