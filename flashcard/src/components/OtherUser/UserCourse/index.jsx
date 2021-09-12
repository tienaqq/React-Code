import { List, Card, Descriptions } from "antd";

function UserCourse(props) {
  const { subjects } = props;

  return (
    <div className="other__course">
      <div className="other__course-left">
        <List
          grid={{ gutter: 16, column: 1 }}
          header={<div>SUBJECT</div>}
          dataSource={subjects}
          pagination={{
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item>
              <Card hoverable>
                <Descriptions title={"About"} column={3}>
                  <Descriptions.Item label="Email" span={3}>
                    tienaqq@gmail.com
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender" span={3}>
                    Male
                  </Descriptions.Item>
                  <Descriptions.Item label="Address" span={3}>
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang,
                    China
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                  <Descriptions.Item label="Hobby Topics">
                    tienaqq@gmail.com
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
