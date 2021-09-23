import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  List,
  Rate,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackByAdmin } from "redux/reducer/admin";
import { returnServiceType } from "services/returnServiceType";

const { Option } = Select;
const { Text } = Typography;

function FeedbackList() {
  const dispatch = useDispatch();
  const { feedbacks } = useSelector((state) => state.admin);
  const [list, setList] = useState(null);

  useEffect(() => {
    dispatch(fetchFeedbackByAdmin());
  }, []);

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
            <Button>Hello</Button>
          </Space>
        }
        dataSource={list ? list : feedbacks}
        pagination={{
          pageSize: 10,
        }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card size="small" hoverable>
              <Row gutter={[16, 16]}>
                <Col xs={24} xl={4} xxl={4}>
                  <Image
                    width={150}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </Col>
                <Col xs={24} xl={20} xxl={20}>
                  <Descriptions column={4} size="small">
                    <Descriptions.Item span={4}>
                      <Text strong>{item.serviceName}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Member" span={2}>
                      <Text strong>{item.accountId}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Donor" span={2}>
                      <Text strong>{item.donorId}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Feedback" span={4}>
                      {item.content}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created" span={2}>
                      {moment(item.dateOfFeedback).format("YYYY-MM-DD")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Type" span={2}>
                      {returnServiceType(item.serviceTypeId)}
                    </Descriptions.Item>
                  </Descriptions>
                  <Rate disabled defaultValue={item.point} />
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
export default FeedbackList;
