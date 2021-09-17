import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  List,
  Typography,
  Image,
} from "antd";
import { backStatus } from "constants/backStatus";
import Moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { checkPrivateSubject, checkPublicSubject } from "..";

const { Text, Paragraph } = Typography;

function SearchSubject() {
  const history = useHistory();
  const { subjects } = useSelector((state) => state.search);

  const check = (item) => {
    const status = item.statusId;
    const id = item.subjectId;
    const join = item.joinStatus;
    if (join === "Join") return history.push(`/latest/${id}`);
    switch (status) {
      case 1: {
        checkPublicSubject(id);
        break;
      }
      case 2: {
        checkPrivateSubject(id);
        break;
      }
      default:
        break;
    }
  };

  return (
    <List
      grid={{ gutter: 32, xxl: 3, lg: 3, xl: 3, sm: 3, md: 2, sm: 2, xs: 1 }}
      pagination={{
        pageSize: 10,
      }}
      header={
        <div>
          Record: <b>{subjects?.length}</b>
        </div>
      }
      dataSource={subjects}
      renderItem={(item) => (
        <List.Item>
          <Card
            size="small"
            hoverable
            className="app--shadow"
            cover={<Image preview={false} height={130} src={item.imageUrl} />}
            extra={backStatus(item.statusId)}
            actions={[
              <Button key="join" type="text" onClick={() => check(item)}>
                Learn
              </Button>,
            ]}
          >
            <Descriptions column={2}>
              <Descriptions.Item span={2}>
                <Text strong>{item.subjectName}</Text>
                {item.joinStatus === "Join" && (
                  <Text style={{ color: "#FD695A" }}> (Joined)</Text>
                )}
                {item.joinStatus === "Waiting author approve" && (
                  <Text style={{ color: "#FD695A" }}> (Waiting)</Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item span={2}>
                <Paragraph
                  ellipsis={{
                    rows: 2,
                    tooltip: item.subjectDescription,
                  }}
                >
                  {item.subjectDescription}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Creation Time" span={2}>
                {Moment(item.createdDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="Point" span={2}>
                <b>{item.point_require}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Created" span={2}>
                <a>{item.author}</a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </List.Item>
      )}
    />
  );
}
export default SearchSubject;
