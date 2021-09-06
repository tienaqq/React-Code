import { TagOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Descriptions, List } from "antd";
import { backStatus } from "constants/backStatus";
import Moment from "moment";
import { useSelector } from "react-redux";
import "./index.css";

function SearchLesson() {
  const { lessons } = useSelector((state) => state.search);
  console.log(lessons);

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      pagination={{
        pageSize: 10,
      }}
      header={<div>Record: {lessons?.length}</div>}
      dataSource={lessons}
      renderItem={(item) => (
        <List.Item>
          <Card
            size="small"
            title={item.lession.lessionName}
            extra={backStatus(item.lession.statusId)}
            actions={[
              <Button key="join" type="text">
                Join
              </Button>,
            ]}
          >
            <Descriptions column={2}>
              <Descriptions.Item span={2}>
                {item.lession.lessionDescription}
              </Descriptions.Item>
              <Descriptions.Item label="Publish" span={2}>
                {Moment(item.lession.createdDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
            </Descriptions>
            <div className="search-card__tags">
              {item.flashcard_inside.map((item, index) => {
                if (index < 2) {
                  return (
                    <div
                      className="search-card__tags-wrap"
                      key={item.flashcardId}
                    >
                      <span className="search-card__tag-item--name">
                        <TagOutlined /> {item.flashcardName}
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
export default SearchLesson;
