import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  List,
  PageHeader,
  Row,
  Tag,
  Typography,
} from "antd";
import { backStatus } from "constants/backStatus";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { checkPrivateSubject, checkPublicSubject } from "..";
import "./index.css";

const { Text } = Typography;

function SearchSubjectByFlashcard() {
  const { subjectsBy } = useSelector((state) => state.search);
  const history = useHistory();

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
      grid={{ gutter: 16, column: 1 }}
      pagination={{
        pageSize: 10,
      }}
      header={
        <div>
          Record: <b>{subjectsBy?.length}</b>
        </div>
      }
      dataSource={subjectsBy}
      renderItem={(item) => (
        <List.Item>
          <Card>
            <Row>
              <Col xxl={5} xl={5} lg={5}>
                <Image
                  preview={false}
                  width={200}
                  alt="logo"
                  src={item.imageUrl}
                />
              </Col>
              <Col xxl={19} xl={19} lg={19}>
                <PageHeader
                  ghost={false}
                  title={item.subjectName}
                  subTitle={
                    item.joinStatus === "Join" && (
                      <Text type="warning">(Joined)</Text>
                    )
                  }
                  tags={backStatus(item.statusId)}
                  extra={[
                    <Button key="learn" onClick={() => check(item)}>
                      Learn
                    </Button>,
                  ]}
                  style={{ padding: 0 }}
                >
                  <Descriptions size="small" column={3}>
                    <Descriptions.Item span={3}>
                      {item.subjectDescription}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created">
                      <a>{item.fullName}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Creation Time">
                      {moment(item.createdDate).format("YYYY-MM-DD")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Point">
                      <Tag color="#108ee9">{item.point_require}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Subject" span={3}>
                      <a>
                        {item.lesson.lessionName +
                          " (" +
                          item.lesson.lessionDescription +
                          ")"}
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Flashcard" span={3}>
                      <a>{item.lesson.flashcard.flashcardName}</a>
                    </Descriptions.Item>
                  </Descriptions>
                </PageHeader>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
}
export default SearchSubjectByFlashcard;
