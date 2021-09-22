import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Image,
  Input,
  List,
  Row,
  Select,
  Typography,
} from "antd";
import {
  refundPoint,
  removeAds,
  returnStatusType,
  runAds,
  showRefund,
} from "components/Admin/functionAds";
import Moment from "moment";
import { useEffect, useState } from "react";
import "./index.css";

const { Text, Link } = Typography;
const { Option } = Select;

function AdminAdsList(props) {
  const { adsList } = props;
  const [name, setName] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(adsList);
    let unique = [];
    unique = [...new Set(adsList?.map((item) => item.donorId))];
    setName(unique);
  }, [adsList]);

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
              <Card hoverable className="ads__card" size="small">
                <Row gutter={[16, 16]}>
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
                      <Descriptions.Item label="Description" span={3}>
                        <Text>{item.content}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Target URL" span={2}>
                        <Link href={item.target_url}>
                          {item.target_url?.substr(0, 100)}
                        </Link>
                      </Descriptions.Item>
                      <Descriptions.Item label="Point to spend">
                        <Text strong>{item.expected_using_point}</Text>
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
                        {returnStatusType(item.statusId)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Donor" span={2}>
                        <Text>{item.donorId}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Impressions">
                        <Text strong>{item.time_rendering}</Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
                <div className="ads__menu">
                  {item.statusId === 1 && (
                    <Button type="text" onClick={() => runAds(item.id)}>
                      Active
                    </Button>
                  )}
                  {item.statusId === 1 && (
                    <Button type="text" onClick={() => removeAds(item.id)}>
                      Remove
                    </Button>
                  )}
                  {showRefund(item) && (
                    <Button type="text" onClick={() => refundPoint(item.id)}>
                      Refund
                    </Button>
                  )}
                </div>
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
