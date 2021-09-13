import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Descriptions, List, Typography } from "antd";
import { backStatus } from "constants/backStatus";
import Moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { checkPrivateSubject, checkPublicSubject } from "..";

const { Text } = Typography;

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
      grid={{ gutter: 16, column: 3 }}
      pagination={{
        pageSize: 10,
      }}
      header={<div>Record: {subjects?.length}</div>}
      dataSource={subjects}
      renderItem={(item) => (
        <List.Item>
          <Card
            size="small"
            title={
              <>
                {item.subjectName}{" "}
                {item.joinStatus === "Join" && (
                  <Text style={{ color: "#FD695A" }}> (Joined)</Text>
                )}
                {item.joinStatus === "Waiting author approve" && (
                  <Text style={{ color: "#FD695A" }}> (Waiting)</Text>
                )}
              </>
            }
            extra={backStatus(item.statusId)}
            actions={[
              <Button key="join" type="text" onClick={() => check(item)}>
                Learn
              </Button>,
            ]}
          >
            <Descriptions column={2}>
              <Descriptions.Item span={2}>
                {item.subjectDescription}
              </Descriptions.Item>
              <Descriptions.Item label="Publish" span={2}>
                {Moment(item.createdDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item
                span={2}
                label={
                  <Avatar
                    style={{ backgroundColor: "#1890FF" }}
                    size="small"
                    icon={<UserOutlined />}
                  />
                }
              >
                {item.author}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </List.Item>
      )}
    />
  );
}
export default SearchSubject;
