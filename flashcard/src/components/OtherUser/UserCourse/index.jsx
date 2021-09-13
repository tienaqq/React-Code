import { Card, Descriptions, List } from "antd";

function UserCourse(props) {
  const { subjects } = props;

  return (
    <div className="other__course">
      <div className="other__course-left">
        <List
          grid={{ gutter: 16, column: 1 }}
          header={<div>SUBJECT JOINED</div>}
          dataSource={subjects}
          pagination={{
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item>
              <Card hoverable>
                <Descriptions title={item.subjectName} column={3}>
                  <Descriptions.Item label="Desc" span={3}>
                    {item.subjectDescription}
                  </Descriptions.Item>
                  <Descriptions.Item label="Author" span={3}>
                    {item.accountId}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <div className="other__course-right">
        <h3>Course</h3>
        <p>Overview</p>
      </div>
    </div>
  );
}
export default UserCourse;
