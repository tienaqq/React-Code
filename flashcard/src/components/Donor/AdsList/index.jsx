import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  List,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import adsAPI from "apis/ads";
import Notification from "components/Notification";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAds, setShowModal } from "redux/reducer/donor";
import { returnStatusType } from "../functionDonor";
import AdsForm from "./AdsForm";
import "./index.css";

const { Text, Link } = Typography;
const { confirm } = Modal;

function AdsList(props) {
  const { ads } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    dispatch(fetchAds());
    setLoading(false);
  }, []);

  const remove = async (id) => {
    confirm({
      title: "Notification",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure delete this item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const res = await adsAPI.removeAds({ advertiseId: id });
        if (res.status === "Success") {
          Notification("success", res.message);
          dispatch(fetchAds());
        } else {
          Notification("error", res.message);
        }
      },
    });
  };

  const showModal = (item) => {
    setUpdate(item ? item : null);
    dispatch(setShowModal(true));
  };

  return (
    <div style={{ maxWidth: 1000, paddingBottom: 100 }}>
      <AdsForm update={update} />
      <Space style={{ marginBottom: 20 }}>
        <Button icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Ads
        </Button>
      </Space>
      <List
        loading={loading}
        header={<div>List Advertisement</div>}
        grid={{ gutter: 16, column: 1 }}
        pagination={{
          pageSize: 10,
        }}
        dataSource={ads}
        renderItem={(item) => (
          <List.Item>
            <Card className="ads__card" hoverable size="small">
              <Row gutter={[16, 16]}>
                <Col xs={24} xl={24} xxl={4}>
                  <Image src={item.imageLink} alt="ads" />
                </Col>
                <Col xs={24} xl={24} xxl={20}>
                  <Descriptions size="small">
                    <Descriptions.Item label="Advertisement" span={3}>
                      <Text strong>{item.title}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>
                      <Text>{item.content}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Target URL" span={3}>
                      <Link href={item.target_url}>
                        {item.target_url?.substr(0, 100)}
                      </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Point to spend" span={2}>
                      <Text strong>{item.expected_using_point}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Impressions">
                      <Text strong>{item.time_rendering}</Text>
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
                  </Descriptions>
                </Col>
              </Row>
              <div className="ads__menu">
                {item.statusId === 1 && (
                  <Button type="text" onClick={() => showModal(item)}>
                    Edit
                  </Button>
                )}
                {item.statusId === 1 && (
                  <Button type="text" onClick={() => remove(item.id)}>
                    Remove
                  </Button>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
export default AdsList;
