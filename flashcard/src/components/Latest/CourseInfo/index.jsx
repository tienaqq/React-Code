import { EyeOutlined } from "@ant-design/icons";
import { Descriptions, PageHeader } from "antd";
import { useSelector } from "react-redux";
import Moment from "moment";

function CourseInfo() {
  const { subject } = useSelector((state) => state.latest);

  return (
    <PageHeader
      title={subject?.subjectName}
      subTitle={`(${subject?.numOfView} views)`}
      className="app--border app--bg app--shadow app--mg20"
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="Author">
          {subject?.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Publish" span={2}>
          {Moment(subject?.createdDate).format("YYYY-MM-DD")}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {subject?.subjectDescription}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
}
export default CourseInfo;
