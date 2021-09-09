import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdsByAdmin } from "redux/reducer/admin";
import {
  List,
  Typography,
  Button,
  Card,
  Row,
  Col,
  Descriptions,
  Image,
  Tag,
  Divider,
  Select,
  Input,
  Form,
} from "antd";
import Moment from "moment";
import "./index.css";

const { Text } = Typography;
const { Option } = Select;

function AdminAdsList() {
  const dispatch = useDispatch();
  const { adsList } = useSelector((state) => state.admin);
  const [name, setName] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchAdsByAdmin());
  }, []);

  useEffect(() => {
    setData(adsList);
    let unique = [];
    unique = [...new Set(adsList?.map((item) => item.donorId))];
    setName(unique);
  }, [adsList]);

  console.log(name);

  const onFinish = (values) => {
    let title = values.title;
    let id = values.donorId;
    let filter = [];
    if (title && id) {
      filter = adsList.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1 &&
          item.donorId === id
        );
      });
      return setData(filter);
    } else if (title) {
      filter = adsList.filter((item) => {
        return item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
      });
      return setData(filter);
    } else if (id) {
      filter = adsList.filter((item) => item.donorId === id);
      return setData(filter);
    } else {
      setData(adsList);
    }
  };

  return (
    <div className="admin__ads-container">
      <div className="admin__ads-content">
        <List
          itemLayout="horizontal"
          grid={{ gutter: 16, column: 1 }}
          header={<div>Request Advertisement</div>}
          footer={<div>Record: {adsList?.length}</div>}
          pagination={{
            pageSize: 10,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card>
                <Row>
                  <Col xs={24} xl={4} xxl={4}>
                    <Image
                      src={item.imageLink}
                      alt="ads"
                      style={{ maxHeight: 90 }}
                    />
                  </Col>
                  <Col xs={24} xl={20} xxl={20}>
                    <Descriptions size="small">
                      <Descriptions.Item label="Advertisement" span={3}>
                        <Text strong>{item.title}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Content" span={3}>
                        <Text>{item.content}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Start">
                        <Text>
                          {Moment(item.startDate).format("YYYY-MM-DD h:mm:ss")}
                        </Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="End">
                        <Text>
                          {Moment(item.endDate).format("YYYY-MM-DD h:mm:ss")}
                        </Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Status">
                        <Tag color="#2db7f5">{item.statusName}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Donor">
                        <Text>{item.donorId}</Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
        <div className="admin__ads-filter">
          <Divider orientation="left" plain>
            Filter
          </Divider>
          <Form
            name="basic"
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="title">
              <Input placeholder="Input search title" allowClear />
            </Form.Item>
            <Form.Item name="donorId">
              <Select allowClear placeholder="Filter by email">
                {name.map((n) => (
                  <Option key={n} value={n}>
                    {n}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Filter
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default AdminAdsList;
